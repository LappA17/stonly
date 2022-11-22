import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { IssueStates } from '@app/issue/types/issue.states';
import { UserEntity } from '@app/user/models/user.entity';

@Entity({ name: 'issues' })
export class IssueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column()
  state: IssueStates;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @BeforeUpdate()
  updateTimeStamp() {
    this.updateAt = new Date();
  }

  @ManyToOne(() => UserEntity, (user) => user.issues, { eager: true })
  author: UserEntity;
}
