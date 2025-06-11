import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  create(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('logout')
  logout() {}
}
