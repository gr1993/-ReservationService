import { IsString, IsOptional } from 'class-validator';

export class UpdateMemberDto {
  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  name: string;

  @IsString()
  mobile: string;
}
