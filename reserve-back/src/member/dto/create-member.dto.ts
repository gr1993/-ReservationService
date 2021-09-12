import { IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  id: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  mobile: string;
}
