import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {PrismaService} from "../prisma.service";
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";

@Module({
  imports: [UserModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, UserService],
})
export class OrderModule {}
