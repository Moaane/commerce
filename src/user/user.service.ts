import { BadRequestException, Injectable } from '@nestjs/common';
import { ChangePasswordDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async get(userId: string) {
        return await this.prisma.user.findUnique({
            where: { id: userId }
        })
    }

    async changePhoneNumber(userId: string, phoneNumber: string) {
        return await this.prisma.user.update({
            where: { id: userId },
            data: { phoneNumber }
        })
    }

    async changeEmail(userId: string, email: string) {
        const existingEmail = await this.prisma.user.findUnique({
            where: { email }
        })

        if (existingEmail) {
            throw new BadRequestException('email already in use')
        }

        return await this.prisma.user.update({
            where: { id: userId },
            data: { email }
        })
    }

    async changePassword(userId: string, dto: ChangePasswordDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        })

        const password = await bcrypt.compare(dto.password, user.password)

        if (!password) {
            throw new BadRequestException('password wrong')
        }

        if (dto.password.length < 6) {
            throw new BadRequestException('password less than 6 characters')
        }

        const newPassword = await bcrypt.hash(dto.password, 10)

        return await this.prisma.user.update({
            where: { id: user.id },
            data: { password: newPassword }
        })
    }
}
