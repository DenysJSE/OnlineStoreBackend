import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {AuthDto} from "./dto/auth.dto";
import {faker} from "@faker-js/faker";
import {JwtService} from "@nestjs/jwt";
import {User} from "@prisma/client";
import * as bcrypt from 'bcrypt'
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private userService: UserService
  ) {}

  async login (dto: AuthDto) {
    const user = await this.validateUser(dto)
    const tokens = await this.issueTokens(user.id)

    return {
      user: this.returnUserFields(user),
      ...tokens
    }
  }

  async register(dto: AuthDto) {
    const existUser = await this.userService.getUserByEmail(dto.email)
    if (existUser) throw new BadRequestException('User with such email already exist!')

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: faker.person.firstName(),
        avatarPath: faker.image.avatar(),
        phone: faker.phone.number('+38(0##) ### ####'),
        password: await bcrypt.hash(dto.password, 10)
      }
    })
    const tokens = await this.issueTokens(user.id)

    return {
      user: this.returnUserFields(user),
      ...tokens
    }
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken)
    if (!result) throw new BadRequestException('Invalid token')

    const user = await this.userService.getUserById(result.id, {isAdmin: true})
    if (!user) throw new BadRequestException('User with such id was not found!')

    const tokens = await this.issueTokens(user.id)

    return {
      user: this.returnUserFields(user),
      ...tokens
    }
  }

  private async issueTokens(userId: number) {
    const data = {id: userId}

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h'
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d'
    })

    return {accessToken, refreshToken}
  }

  private returnUserFields(user: Partial<User>) {
    return {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    }
  }

  private async validateUser (dto: AuthDto) {
    const user = await this.userService.getUserByEmail(dto.email)
    if (!user) throw new BadRequestException('User with such email was not found!')

    const isValid = await bcrypt.compare(dto.password, user.password)
    if (!isValid) throw new BadRequestException('Invalid password')

    return user
  }
}
