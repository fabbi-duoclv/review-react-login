import { Prisma } from '@prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private usersService: UsersService, private jwtService: JwtService) {}

    async signIn(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOneByUsername(username);
      if (user?.password !== await bcrypt.hash(pass, 10)) {
        throw new UnauthorizedException();
      }
      const payload = { username: user.username, sub: user.id };
      return {
          access_token: await this.jwtService.signAsync(payload),
          refresh_token: await this.jwtService.signAsync(payload, { expiresIn: '7d' }), 
        }
    }

    async signUp(signUpDto): Promise<any> {
      const { name:username, password, email } = signUpDto;

      const userName = await this.usersService.findOneByUsername(username);
      if (userName) {
        throw new UnauthorizedException('User already exists');
      }
      const emailUser = await this.usersService.findOneByEmail(email);
      if (emailUser) {
        throw new UnauthorizedException('Email already exists');
      }
      const newUser = await this.usersService.create({
        username,
        password: await bcrypt.hash(password, 10),
        email,
      });

      const payload = { username, sub: newUser.id };
      return {
          access_token: await this.jwtService.signAsync(payload),
          refresh_token: await this.jwtService.signAsync(payload, { expiresIn: '7d' }), 
        }
    }

    async checkToken(token: string): Promise<any> {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      const user = await this.usersService.findOne(decoded.sub);
      if (!user) {
        return false;
      }
      const payload = { username: user.username, sub: user.id, exp: decoded.exp };
      if(decoded.exp < Math.floor(Date.now() / 1000)) {
        return false;
      }
      return {
        access_token: await this.jwtService.signAsync(payload),
        user,
      }
    }

    async refreshToken(token: string): Promise<any> {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      const user = await this.usersService.findOne(decoded.sub);  
      if (!user) {
        return {
          access_token: null,
        };
      }
      const payload = { username: user.username, sub: user.id, exp: decoded.exp };
      if(decoded.exp < Math.floor(Date.now() / 1000)) {
        return {
          access_token: null,
        };
      }
      return {
          access_token: await this.jwtService.signAsync(payload),
          user,
        }
    }

}
