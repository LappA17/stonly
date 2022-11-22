import { IssueEntity } from '@app/issue/models/issue.entity';

export type IssueType = Omit<IssueEntity, 'updateTimeStamp'>;
