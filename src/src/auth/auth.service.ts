import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { comparePassword } from 'helper/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { projects: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user.id });

    return {
      status: 200,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        projects: user.projects,
      },
      token,
    };
  }
}
