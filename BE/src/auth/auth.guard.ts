import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private usersService: UsersService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('context', context)
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            return false;
        }
        try {
            const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            const { sub: userId, exp: expirationTime } = decoded;
            const currentTime = Math.floor(Date.now() / 1000);
            if (currentTime > expirationTime) {
                return false;
            }
            const user = await this.usersService.findOne(decoded.sub);
            request.user = user;
        } catch (error) {
            console.log('error', error)
            return false;
        }
        return true
    }
}

export class AdminGuard implements CanActivate {
    constructor(private jwtService: JwtService, private usersService: UsersService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('context', context)
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            return false;
        }
        try {
            const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            const { sub: userId, exp: expirationTime } = decoded;
            const currentTime = Math.floor(Date.now() / 1000);
            if (currentTime > expirationTime) {
                return false;
            }
            const user = await this.usersService.findOne(decoded.sub);
            if(user.role === 'ADMIN') {
                return true;
            }
            return false;
        } catch (error) {
            console.log('error', error)
            return false;
        }
    }
}