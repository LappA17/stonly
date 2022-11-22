import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, getRepository, Repository } from 'typeorm';
import slugify from 'slugify';
import { IssueEntity } from '@app/issue/models/issue.entity';
import { IssuesResponseInterface } from '@app/issue/types/issuesResponse.interface';
import { UserEntity } from '@app/user/models/user.entity';
import { CreateIssueDto } from '@app/issue/dto/create-issue.dto';
import { IssueResponseInterface } from '@app/issue/types/issueResponse.interface';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(IssueEntity) private readonly issueRepository: Repository<IssueEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  async findAll(currentUserId: number, query: any): Promise<IssuesResponseInterface> {
    const queryBuilder = this.dataSource
      .getRepository(IssueEntity)
      .createQueryBuilder('issues')
      .leftJoinAndSelect('issues.author', 'author');
    if (query.author) {
      const author = await this.userRepository.findOne({
        where: {
          username: query.author,
        },
      });
      if (!author) throw new HttpException(`No author found`, HttpStatus.NOT_FOUND);
      queryBuilder.andWhere('issues.authorId = :id', {
        id: author.id,
      });
    }
    queryBuilder.orderBy('issues.createdAt', 'DESC');
    const issuesCount = await queryBuilder.getCount();
    if (query.limit) {
      queryBuilder.limit(query.limit);
    }
    if (query.offset) {
      queryBuilder.offset(query.offset);
    }
    const issues = await queryBuilder.getMany();
    return { issues, issuesCount };
  }

  async findBySlug(slug: string): Promise<IssueEntity> {
    const issue = await this.issueRepository.findOne({
      where: { slug },
    });
    if (!issue) throw new HttpException(`No issue found with this slug`, HttpStatus.NOT_FOUND);
    return issue;
  }

  async createIssue(currentUser: UserEntity, createIssueDto: CreateIssueDto): Promise<IssueEntity> {
    const issue = new IssueEntity();
    Object.assign(issue, createIssueDto);
    issue.slug = this.getSlug(createIssueDto.title);
    issue.author = currentUser;
    return this.issueRepository.save(issue);
  }

  async deleteIssue(slug: string, currentUserId: number): Promise<DeleteResult> {
    const issue = await this.findBySlug(slug);
    if (!issue) {
      throw new HttpException('Issue does not exist', HttpStatus.NOT_FOUND);
    }
    if (issue.author.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    return await this.issueRepository.delete({ slug });
  }

  async updateIssueBySlug(
    currentUserId: number,
    slug: string,
    updateIssueDto: CreateIssueDto,
  ): Promise<IssueEntity> {
    const issue = await this.findBySlug(slug);
    if (!issue) throw new HttpException(`No issue found with this slug`, HttpStatus.NOT_FOUND);
    if (issue.author.id !== currentUserId)
      throw new HttpException(
        `This User didn't create this issue, no permission to delete`,
        HttpStatus.FORBIDDEN,
      );
    if (issue.state === 'Pending' && updateIssueDto.state === 'Open') {
      throw new HttpException(
        `You can not open issue when it in pending state`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (
      issue.state === 'Closed' &&
      (updateIssueDto.state === 'Pending' || updateIssueDto.state === 'Open')
    ) {
      throw new HttpException(
        `You can not open or pending issue when its closed`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    Object.assign(issue, updateIssueDto);
    return await this.issueRepository.save(issue);
  }

  buildIssueResponse(issue: IssueEntity): IssueResponseInterface {
    return { issue };
  }

  private getSlug(title: string): string {
    return (
      slugify(title, {
        lower: true,
      }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
