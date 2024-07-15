import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {returnProductObject, returnProductObjectFullest} from "./return-product.object";
import {ProductDto} from "./dto/product.dto";
import {generateSlug} from "../utils/generate-slug";
import {EnumProductSort, GetAllProductDto} from "../category/dto/get-all-product.dto";
import {PaginationService} from "../pagination/pagination.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
  ) {
  }

  async getAll(dto: GetAllProductDto = {}) {
    const {sort, searchTerm} = dto

    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

    if (sort === EnumProductSort.LOW_PRICE) {
      prismaSort.push({price: 'asc'})
    } else if (sort === EnumProductSort.HIGH_PRICE) {
      prismaSort.push({price: 'desc'})
    } else if (sort === EnumProductSort.OLDEST) {
      prismaSort.push({createdAt: 'asc'})
    } else {
      prismaSort.push({createdAt: 'desc'})
    }

    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm ? {
      OR: [
        {
          category: {
            name: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
        },
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive'
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        }
      ]
    } : {}

    const {perPage, skip} = this.paginationService.getPagination(dto)

    const products = await this.prisma.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
      select: returnProductObject
    })

    return {
      products, length: await this.prisma.product.count({
        where: prismaSearchTermFilter
      })
    }
  }

  async getProductById(id: number) {
    const products = await this.prisma.product.findUnique({
      where: {id},
      select: returnProductObjectFullest
    })
    if (!products) throw new BadRequestException('Product not found!')

    return products
  }

  async getProductBySlug(slug: string) {
    const products = await this.prisma.product.findUnique({
      where: {slug},
      select: returnProductObjectFullest
    })
    if (!products) throw new BadRequestException('Product not found!')

    return products
  }

  async getProductByCategory(categorySlug: string) {
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug
        }
      },
      select: returnProductObjectFullest
    })
    if (!products) throw new BadRequestException('Product not found!')

    return products
  }

  async getSimilar(id: number) {
    const currentProduct = await this.getProductById(id)
    if (!currentProduct) throw new BadRequestException('Current product not found!')

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          name: currentProduct.category.name
        },
        NOT: {
          id: currentProduct.id
        }
      },
      orderBy: {createdAt: 'desc'},
      select: returnProductObject
    })

    return products
  }

  async createProduct() {
    const product = await this.prisma.product.create({
      data: {
        description: '',
        name: '',
        price: 0,
        slug: ''
      }
    })

    return product.id
  }

  async update(id: number, dto: ProductDto) {
    const {description, images, price, name, categoryId} = dto

    const existCategory = await this.prisma.category.findUnique({
      where: {id: categoryId}
    })
    if(!existCategory) throw new BadRequestException('The category was not found!')

    return this.prisma.product.update({
      where: {id},
      data: {
        description,
        images,
        price,
        name,
        slug: generateSlug(name),
        category: {
          connect: {id: categoryId}
        }
      }
    })
  }

  async delete(id: number) {
    return this.prisma.product.delete({where: {id}})
  }
}
