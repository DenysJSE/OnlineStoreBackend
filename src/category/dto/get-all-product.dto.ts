import {PaginationDto} from "../../pagination/dto/pagination.dto";
import {IsEnum, IsOptional, IsString} from "class-validator";

export enum EnumProductSort {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest'
}

export class GetAllProductDto extends PaginationDto {
  @IsOptional()
  @IsEnum(EnumProductSort)
  sort?: EnumProductSort

  @IsOptional()
  @IsString()
  searchTerm?: string
}