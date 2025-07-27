
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-up')
  signup(@Body() signUpDto: any) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/check-token')
  checkToken(@Body() token: {token: string}) {
    return this.authService.checkToken(token.token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh-token')
  refreshToken(@Body() token: {refresh_token: string}) {
    return this.authService.refreshToken(token.refresh_token);
  }
}
