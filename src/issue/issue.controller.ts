import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { User } from '@app/user/decorators/user.decorator';
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';
import { IssueService } from '@app/issue/issue.service';
import { IssuesResponseInterface } from '@app/issue/types/issuesResponse.interface';
import { AuthGuard } from '@app/guards/auth.guard';
import { UserEntity } from '@app/user/models/user.entity';
import { CreateIssueDto } from '@app/issue/dto/create-issue.dto';
import { IssueResponseInterface } from '@app/issue/types/issueResponse.interface';

@Controller('issues')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Get()
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<IssuesResponseInterface> {
    return await this.issueService.findAll(currentUserId, query);
  }

  @Get(':slug')
  async getSingleIssue(@Param('slug') slug: string): Promise<IssueResponseInterface> {
    const issue = await this.issueService.findBySlug(slug);
    return this.issueService.buildIssueResponse(issue);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('issue') createIssueDto: CreateIssueDto,
  ): Promise<IssueResponseInterface> {
    const issue = await this.issueService.createIssue(currentUser, createIssueDto);
    return this.issueService.buildIssueResponse(issue);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async updateIssue(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body('issue') updateIssueDto: CreateIssueDto,
  ): Promise<IssueResponseInterface> {
    const issue = await this.issueService.updateIssueBySlug(currentUserId, slug, updateIssueDto);
    return this.issueService.buildIssueResponse(issue);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteIssue(@User('id') currentUserId: number, @Param('slug') slug: string): Promise<any> {
    return this.issueService.findBySlugAndDelete(currentUserId, slug);
  }
}
