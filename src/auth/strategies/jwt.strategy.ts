import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ConfigService} from "@nestjs/config";
import {PrismaService} from "../../prisma.service";
import {ExtractJwt, Strategy} from "passport-jwt";
import {User} from "@prisma/client";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET')
    });
  }

  async validate({id}: Pick<User, 'id'>) {
    return this.prisma.user.findUnique({where: {id: +id}})
  }
}
