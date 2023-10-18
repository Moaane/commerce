import { OmitType } from "@nestjs/mapped-types";
import { ProfileEntity } from "src/entities/profile.entity";

export class ProfileDto extends OmitType(ProfileEntity, ['id']) {
    name: string;
    birthDate: Date;
    gender: string;
    userId: string;
}