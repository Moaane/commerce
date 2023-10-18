import { Profile } from "@prisma/client";

export class ProfileEntity implements Profile {
    id: string;
    name: string;
    birthDate: Date;
    gender: string;
    userId: string;
}