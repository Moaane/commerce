import { BadRequestException, Injectable } from '@nestjs/common';
import { ChangeEmailDto, ChangePasswordDto, ChangePhoneNumberDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    /// USER
    async findOneUser(userId: string) {
        return await this.prisma.user.findUnique({
            where: { id: userId }
        })
    }

    async changePhoneNumber(userId: string, dto: ChangePhoneNumberDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        })

        const password = await bcrypt.compare(dto.password, user.password)

        if (!password) {
            throw new BadRequestException('password wrong')
        }

        const existingPhoneNumber = await this.prisma.user.findUnique({
            where: { phoneNumber: dto.phoneNumber }
        })

        if (existingPhoneNumber) {
            throw new BadRequestException('phone number already been use')
        }

        return await this.prisma.user.update({
            where: { id: userId },
            data: { phoneNumber: dto.phoneNumber }
        })
    }

    async changeEmail(userId: string, dto: ChangeEmailDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        })

        const password = await bcrypt.compare(dto.password, user.password)

        if (!password) {
            throw new BadRequestException('password wrong')
        }

        const existingEmail = await this.prisma.user.findUnique({
            where: { email: dto.email }
        })

        if (existingEmail) {
            throw new BadRequestException('email already in use')
        }

        return await this.prisma.user.update({
            where: { id: userId },
            data: { email: dto.email }
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

    ///ADMIN
    async delete(userId: string) {
        return await this.prisma.user.delete({
            where: { id: userId }
        })
    }
}
