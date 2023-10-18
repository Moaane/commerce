import { Body, Controller, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ChangePasswordDto } from 'src/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

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
