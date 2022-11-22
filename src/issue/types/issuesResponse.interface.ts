import { IssueType } from '@app/issue/types/issue.type';

export interface IssuesResponseInterface {
  issues: IssueType[];
  issuesCount: number;
}
