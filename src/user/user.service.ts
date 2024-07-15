import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {UserDto} from "./dto/user.dto";
import {returnUserObject} from "./return-user.object";
import {Prisma} from "@prisma/client";
import {hash} from "bcrypt";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async getUserById(userId: number, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: {id: userId},
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true,
            category: {
              select: {
                slug: true
              }
            },
            reviews: true
          }
        },
        ...selectObject
      }
    })

    if (!user) {
      throw new BadRequestException("User was not found!")
    }

    return user
  }

  async getUserByEmail(userEmail: string) {
    return this.prisma.user.findUnique({
      where: {email: userEmail}
    })
  }

  async updateProfile(id: number, dto: UserDto) {
    const isSameUser = await this.getUserByEmail(dto.email)

    if (isSameUser && id !== isSameUser.id) throw new BadRequestException('This email already exist!')

    const user = await this.getUserById(id)

    return this.prisma.user.update({
      where: {id},
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        password: dto.password ? await hash(dto.password, 10) : user.password
      }
    })
  }

  async toggleFavorite(id: number, productId: number) {
    const user = await this.getUserById(id)
    if (!user) throw new BadRequestException('User not found!')

    const productIsExist = await this.prisma.product.findUnique({
      where: {id: productId}
    })
    if (!productIsExist) throw new BadRequestException('The product with such id is not exist!')

    const isExist = user.favorites.some(product => product.id === productId)

    await this.prisma.user.update({
      where: {id: user.id},
      data: {
        favorites: {
          [isExist ? 'disconnect' : 'connect']: {
            id: productId
          }
        }
      }
    })

    return {message: 'Success!'}
  }
}
