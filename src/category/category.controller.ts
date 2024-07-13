import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {CategoryDto} from "./dto/category.dto";

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.categoryService.getCategoryBySlug(slug)
  }

  @Get(':id')
  @Auth()
  async getById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(+id)
  }

  @Get()
  async getAll() {
    return this.categoryService.getAll()
  }

  @HttpCode(200)
  @Auth()
  @Post()
  async createCategory() {
    return this.categoryService.createCategory()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async updateProfile(@Body() dto: CategoryDto, @Param('id') categoryId: string) {
    return this.categoryService.updateCategory(+categoryId, dto)
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async deleteCategory(@Param('id') categoryId: string) {
    return this.categoryService.deleteCategory(+categoryId)
  }
}
