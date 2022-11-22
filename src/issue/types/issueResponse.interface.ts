import { IssueType } from '@app/issue/types/issue.type';

export interface IssueResponseInterface {
  issues: IssueType[];
  issueCount: number;
}
