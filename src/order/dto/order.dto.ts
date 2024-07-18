import {EnumOrderItemStatus} from "@prisma/client";
import {ArrayMinSize, IsEnum, IsNumber, IsOptional, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class OrderDto {
  @IsOptional()
  @IsEnum(EnumOrderItemStatus)
  status: EnumOrderItemStatus

  @ArrayMinSize(1)
  @ValidateNested({each: true})
  @Type(() => OrderItemDto)
  items: OrderItemDto[]
}

export class OrderItemDto {
  @IsNumber()
  quantity: number

  @IsNumber()
  price: number

  @IsNumber()
  productId: number
}