import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ChangePasswordDto } from 'src/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async get(@Req() req) {
    const userId = req.user.sub
    return await this.userService.get(userId)
  }

  @Patch('update-email')
  async changePhoneNumber(@Req() req, @Body() phoneNumber: string) {
    const userId = req.user.sub
    return await this.userService.changeEmail(userId, phoneNumber)
  }

  @Patch('update-email')
  async changeEmail(@Req() req, @Body() email: string) {
    const userId = req.user.sub
    return await this.userService.changeEmail(userId, email)
  }

  @Patch('update-password')
  async changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    const userId = req.user.sub
    return await this.userService.changePassword(userId, dto)
  }
}
