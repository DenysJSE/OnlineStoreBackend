import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {returnReviewObject} from "./return-review.object";
import {ReviewDto} from "./dto/review.dto";

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async getAll() {
    return this.prisma.review.findMany({
      orderBy: {createdAt: 'desc'},
      select: returnReviewObject
    })
  }

  async createReview(userId: number, dto: ReviewDto, productId: number) {
    const existProduct = await this.prisma.product.findUnique({
      where: {id: productId}
    })
    if (!existProduct) throw new BadRequestException('The product with such id was not found!')

    return this.prisma.review.create({
      data: {
        ...dto,
        product: {
          connect: {id: productId}
        },
        user: {
          connect: {id: userId}
        }
      }
    })
  }

  async getAverageValueByProductId(productId: number) {
    const existProduct = await this.prisma.product.findUnique({
      where: {id: productId}
    })
    if (!existProduct) throw new BadRequestException('The product with such id was not found!')

    return this.prisma.review.aggregate({
      where: {productId},
      _avg: {rating: true}
    }).then(data => data._avg)
  }
}
