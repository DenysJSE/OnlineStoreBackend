import {Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { OrderService } from './order.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {CurrentUser} from "../auth/decorators/user.decorator";
import {OrderDto} from "./dto/order.dto";

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth()
  getAll(@CurrentUser('id') userId: number) {
    return this.orderService.getAll(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  placeOrder(@Body() dto: OrderDto, @CurrentUser('id') userId: number) {
    return this.orderService.placeOrder(dto, userId)
  }
}
