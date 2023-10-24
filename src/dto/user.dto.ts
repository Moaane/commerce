import { OmitType } from "@nestjs/mapped-types";
import { UserEntity } from "src/entities/user.entity";

export class ChangePasswordDto extends OmitType(UserEntity, ['id']) {
    Password: string;
    newPassword: string
}

export class ChangeEmailDto extends OmitType(UserEntity, ['id']) {
    password: string;
    email: string;
}

export class ChangePhoneNumberDto extends OmitType(UserEntity, ['id']) {
    Password: string;
    phoneNumber: string;
}