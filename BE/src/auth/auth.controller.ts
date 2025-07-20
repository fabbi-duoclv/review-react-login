
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-up')
  signup(@Body() signUpDto: any) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/check-token')
  checkToken(@Body() token: any) {
    return this.authService.checkToken(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh-token')
  refreshToken(@Body() token: any) {
    return this.authService.refreshToken(token);
  }
}
