import { Prisma } from '@prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private usersService: UsersService, private jwtService: JwtService) {}

    async signIn(email: string, pass: string): Promise<any> {
      console.log('email', email)
      const user = await this.usersService.findOneByEmail(email);
      console.log('user?.password', user?.password);
      const isPasswordValid = await bcrypt.compare(pass, user.password);
      if (isPasswordValid) {
        throw new UnauthorizedException();
      }
      const payload = { username: user.username, id: user.id };
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

      const payload = { username, id: newUser.id };
      return {
          access_token: await this.jwtService.signAsync(payload),
          refresh_token: await this.jwtService.signAsync(payload, { expiresIn: '7d' }), 
        }
    }

    async checkToken(token: string): Promise<any> {
      console.log('--- checkToken token ---',token);
      try {
        const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        console.log('decoded', decoded)
        if(!decoded) {
          return false;
        }
        const user = await this.usersService.findOne(decoded.id);
        if (!user) {
          return false;
        }
        if(decoded.exp < Math.floor(Date.now() / 1000)) {
          return false;
        }
        const payload = { username: user.username, id: user.id };
        return {
          access_token: await this.jwtService.signAsync(payload),
          user,
        }
      } catch (error) {
        console.log('--- error ---',error);
        return false;
      }
    }

    async refreshToken(token: string): Promise<any> {
      try {
        const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        const user = await this.usersService.findOne(decoded.id);
        if (!user) {
          return {
            access_token: null,
          };
        }
        if(decoded.exp < Math.floor(Date.now() / 1000)) {
          return {
            access_token: null,
          };
        }
        const payload = { username: user.username, id: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user,
          }
      } catch (error) {
        console.log('--- error ---',error);
        return false;
      }
    }

}
