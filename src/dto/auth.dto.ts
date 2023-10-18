import { OmitType } from "@nestjs/mapped-types";
import { UserEntity } from "src/entities/user.entity";

export class RegisterDto {
    email: string;
    password: string;
    PhoneNumber: string
    name: string
}


export class LoginDto extends OmitType(UserEntity, ['id']) {
    email: string;
    password: string;
}
