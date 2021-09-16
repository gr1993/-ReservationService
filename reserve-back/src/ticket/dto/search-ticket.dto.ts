import { Type } from 'class-transformer';
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

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate: Date;
}
