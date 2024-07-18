import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";

@Injectable()
export class StatisticService {
  constructor(private prisma: PrismaService) {}

  async getMain() {
    const ordersCount = await this.prisma.order.count()
    const reviewCount = await this.prisma.review.count()
    const usersCount = await this.prisma.user.count()

    const totalAmount = await this.prisma.order.aggregate({
      _sum: {
        total: true
      }
    })

    return [
      {
        name: 'Orders',
        value: ordersCount
      },
      {
        name: 'Reviews',
        value: reviewCount
      },
      {
        name: 'Users',
        value: usersCount
      },
      {
        name: 'Total amount',
        value: totalAmount._sum.total
      }
    ]
  }
}
