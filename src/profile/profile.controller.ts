import { Controller, Get, Patch, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from 'src/dto/profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get()
  async get(@Req() req) {
    const userId = req.user.sub
    return await this.profileService.get(userId)
  }

  @Patch('update')
  async update(@Req() req, dto: ProfileDto) {
    const userId = req.user.sub
    return await this.profileService.update(userId, dto)
  }
}
