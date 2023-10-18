import { $Enums, User } from "@prisma/client";

export class UserEntity implements User {
    id: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: $Enums.Role;
} 