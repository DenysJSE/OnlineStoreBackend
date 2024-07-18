import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {returnProductObject} from "../product/return-product.object";
import {OrderDto} from "./dto/order.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private userService: UserService) {}

  async getAll() {
    return this.prisma.order.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        items: {
          include: {
            product: {
              select: returnProductObject
            }
          }
        }
      }
    })
  }

  async getByUserId(userId: number) {
    await this.userService.getUserById(userId)

    return this.prisma.order.findMany({
      where: {userId},
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        items: {
          include: {
            product: {
              select: returnProductObject
            }
          }
        }
      }
    })
  }

  async placeOrder(dto: OrderDto, userId: number) {
    const total = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

    const order = await this.prisma.order.create({
      data: {
        status: dto.status,
        items: {
          create: dto.items
        },
        total,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })

    return order
  }
}
