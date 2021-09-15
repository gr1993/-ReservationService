import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchTicketDto {
  @IsNumber()
  pageNumber: number;

  @IsNumber()
  memberCount: number;

  @IsString()
  @IsOptional()
  airline: string;

  @IsString()
  @IsOptional()
  startAirport: string;

  @IsString()
  @IsOptional()
  endAirport: string;

  @IsDate()
  @IsOptional()
  date: Date;
}
