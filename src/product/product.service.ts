import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {returnProductObject, returnProductObjectFullest} from "./return-product.object";
import {ProductDto} from "./dto/product.dto";
import {generateSlug} from "../utils/generate-slug";
import {EnumProductSort, GetAllProductDto} from "./dto/get-all-product.dto";
import {PaginationService} from "../pagination/pagination.service";
import {Prisma} from "@prisma/client";
import {CategoryService} from "../category/category.service";
import {convertToNumber} from "../utils/convert-to-number";

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
    private categoryService: CategoryService
  ) {
  }

  async getAll(dto: GetAllProductDto = {}) {
    const {perPage, skip} = this.paginationService.getPagination(dto)

    const filters = this.createFilter(dto)

    const products = await this.prisma.product.findMany({
      where: filters,
      orderBy: this.getSortOption(dto.sort),
      skip,
      take: perPage,
      select: returnProductObject
    })

    return {
      products,
      length: await this.prisma.product.count({
        where: filters
      })
    }
  }

  private getCategoryFilter(categoryId: number): Prisma.ProductWhereInput {
    return {
      categoryId
    }
  }

  private getPriceFilter(minPrice?: number, maxPrice?: number): Prisma.ProductWhereInput {
    let priceFilter: Prisma.IntFilter | undefined = undefined

    if (minPrice) {
      priceFilter = {
        ...priceFilter,
        gte: minPrice
      }
    }

    if (maxPrice) {
      priceFilter = {
        ...priceFilter,
        lte: maxPrice
      }
    }

    return {
      price: priceFilter
    }
  }

  private getRatingFilter(ratings: number[]): Prisma.ProductWhereInput {
    return {
      reviews: {
        some: {
          rating: {
            in: ratings
          }
        }
      }
    }
  }

  private getSearchTermFilter(searchTerm: string): Prisma.ProductWhereInput {
    return {
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
    }
  }

  private getSortOption(sort: EnumProductSort): Prisma.ProductOrderByWithRelationInput[] {
    switch (sort) {
      case EnumProductSort.LOW_PRICE:
        return [{price: 'asc'}]
      case EnumProductSort.HIGH_PRICE:
        return [{price: 'desc'}]
      case EnumProductSort.OLDEST:
        return [{createdAt: 'asc'}]
      default:
        return [{createdAt: 'desc'}]
    }
  }

  private createFilter(dto: GetAllProductDto): Prisma.ProductWhereInput {
    const filters: Prisma.ProductWhereInput[] = []

    if (dto.searchTerm) filters.push(this.getSearchTermFilter(dto.searchTerm))
    if (dto.ratings) filters.push(this.getRatingFilter(dto.ratings.split('|').map(rating => +rating)))
    if (dto.minPrice || dto.maxPrice) filters.push(this.getPriceFilter(
      convertToNumber(dto.minPrice),
      convertToNumber(dto.maxPrice)
    ))
    if (dto.categoryId) filters.push(this.getCategoryFilter(+dto.categoryId))

    return filters.length ? {AND: filters} : {}
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

    await this.categoryService.getCategoryById(categoryId)

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
