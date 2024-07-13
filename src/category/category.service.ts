import {BadRequestException, Injectable} from '@nestjs/common';
import {returnCategoryObject} from "./return-category.object";
import {PrismaService} from "../prisma.service";
import {CategoryDto} from "./dto/category.dto";
import {generateSlug} from "../utils/generate-slug";

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async getCategoryById(userId: number) {
    const category = await this.prisma.category.findUnique({
      where: {id: userId},
      select: returnCategoryObject
    })

    if (!category) {
      throw new BadRequestException("Category was not found!")
    }

    return category
  }

  async getCategoryBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: {slug},
      select: returnCategoryObject
    })

    if (!category) {
      throw new BadRequestException("Category was not found!")
    }

    return category
  }

  async getAll() {
    return this.prisma.category.findMany({
      select: returnCategoryObject
    })
  }

  async createCategory() {
    return this.prisma.category.create({
      data: {
        name: '',
        slug: ''
      }
    })
  }

  async updateCategory(id: number, dto: CategoryDto) {
    return this.prisma.category.update({
      where: {id},
      data: {
        name: dto.name,
        slug: generateSlug(dto.name)
      }
    })
  }

  async deleteCategory(id: number) {
    return this.prisma.category.delete({where: {id}})
  }
}
