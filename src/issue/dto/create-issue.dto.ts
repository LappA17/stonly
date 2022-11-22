import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

import { IssueStates } from '@app/issue/types/issue.states';

export class CreateIssueDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(IssueStates, { message: 'State must be Open, Pending or Closed' })
  readonly state: string;
}
