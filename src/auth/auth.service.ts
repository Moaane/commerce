import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService
    ) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email }
        })

        if (existingUser) {
            throw new UnauthorizedException('username already in use')
        }

        // if (user.password.length < 6) {
        //     throw new UnauthorizedException('password less than 6 characters')
        // }

        const hashedPassword = await bcrypt.hash(dto.password, 10)

        const user = await this.prisma.user.create({
            data: {
                ...dto,
                password: hashedPassword
            }
        })

        const profile = await this.prisma.profile.create({
            data: {
                name: dto.name,
                userId: user.id
            }
        })

        const cart = await this.prisma.cart.create({
            data: {
                userId: user.id
            }
        })

        return { user: user, profile: profile, cart: cart }

    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        })

        if (!user) {
            throw new UnauthorizedException('email not found')
        }

        const password = await bcrypt.compare(dto.password, user.password)

        if (!password) {
            throw new UnauthorizedException('password wrong')
        }

        const payload = { sub: user.id, username: user.email, role: user.role }

        return {
            access_token: await this.jwt.signAsync(payload)
        }
    }
}
