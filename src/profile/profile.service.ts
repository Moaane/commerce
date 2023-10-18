import { Injectable } from '@nestjs/common';
import { ProfileDto } from 'src/dto/profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) { }

    async get(userId: string) {
        return await this.prisma.profile.findUnique({
            where: { userId }
        })
    }

    async update(userId: string, dto: ProfileDto) {
        return await this.prisma.profile.update({
            where: { userId },
            data: dto
        })
    }
}
