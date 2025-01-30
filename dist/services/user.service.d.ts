import { AuthMethod } from "@prisma/client";
declare class UserService {
    create(email: string, password: string, displayName: string, picture: string, method: AuthMethod, isVerified: boolean): Promise<{
        accounts: {
            id: string;
            provider: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            type: string;
            accessToken: string | null;
            refreshToken: string | null;
            expiresAt: number;
        }[];
    } & {
        id: string;
        picture: string | null;
        email: string;
        password: string;
        displayName: string;
        role: import(".prisma/client").$Enums.UserRole;
        isVerified: boolean;
        twoFactorEnabled: boolean;
        method: import(".prisma/client").$Enums.AuthMethod;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getById(id: string): Promise<{
        accounts: {
            id: string;
            provider: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            type: string;
            accessToken: string | null;
            refreshToken: string | null;
            expiresAt: number;
        }[];
    } & {
        id: string;
        picture: string | null;
        email: string;
        password: string;
        displayName: string;
        role: import(".prisma/client").$Enums.UserRole;
        isVerified: boolean;
        twoFactorEnabled: boolean;
        method: import(".prisma/client").$Enums.AuthMethod;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getByEmail(email: string): Promise<{
        accounts: {
            id: string;
            provider: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            type: string;
            accessToken: string | null;
            refreshToken: string | null;
            expiresAt: number;
        }[];
    } & {
        id: string;
        picture: string | null;
        email: string;
        password: string;
        displayName: string;
        role: import(".prisma/client").$Enums.UserRole;
        isVerified: boolean;
        twoFactorEnabled: boolean;
        method: import(".prisma/client").$Enums.AuthMethod;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
declare const _default: UserService;
export default _default;
