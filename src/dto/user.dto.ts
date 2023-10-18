import { OmitType } from "@nestjs/mapped-types";
import { UserEntity } from "src/entities/user.entity";

export class ChangePasswordDto extends OmitType(UserEntity, ['id']) {
    Password: string;
    newPassword: string
}