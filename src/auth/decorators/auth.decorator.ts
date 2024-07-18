import {applyDecorators, UseGuards} from "@nestjs/common";
import {RoleType} from "../auth.interface";
import {JwtAuthGuard} from "../guards/jwt.guard";
import {OnlyAdminGuard} from "../guards/admin.guard";


export const Auth = (role: RoleType = 'user') =>
  applyDecorators(
    role === 'admin'
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard)
  )