import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ChangeEmailDto, ChangePasswordDto, ChangePhoneNumberDto } from 'src/dto/user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async get(@Req() req) {
    const userId = req.user.sub
    return await this.userService.findOneUser(userId)
  }

  @Patch('update-phone-number')
  async changePhoneNumber(@Req() req, @Body() dto: ChangePhoneNumberDto) {
    const userId = req.user.sub
    return await this.userService.changeEmail(userId, dto)
  }

  @Patch('update-email')
  async changeEmail(@Req() req, @Body() dto: ChangeEmailDto) {
    const userId = req.user.sub
    return await this.userService.changeEmail(userId, dto)
  }

  @Patch('update-password')
  async changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    const userId = req.user.sub
    return await this.userService.changePassword(userId, dto)
  }

}
