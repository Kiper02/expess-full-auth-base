import { hash } from "argon2";
import prisma from "../config/prisma.js";
import { AuthMethod } from "@prisma/client";
import { UpdateUserDto } from "../dto/update-user.dto.js";



class UserService {
    public async create(
        email: string,
        password: string,
        displayName: string,
        picture: string,
        method: AuthMethod,
        isVerified: boolean
    ) {
        const user = await prisma.user.create({
            data: {
                email,
                password: password ? await hash(password) : '',
                displayName,
                picture,
                method,
                isVerified
            },
            include: {
                accounts: true
            }
        })
        return user;
    }

    public async getById(id: string) {
        const user = await prisma.user.findUnique({
            where: { id },
            include: { accounts: true }
        });

        if(!user) {
            throw new Error("Пользователь не найден, пожалуйста проверьте введенные данные")
        }
        return user;
    }

    public async getByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { accounts: true }
        });

        return user;
    }

    public async update(userId: string, dto: UpdateUserDto) {
        const user = await this.getById(userId);

        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                email: dto.email,
                displayName: dto.name,
                isTwoFactorEnabled: dto.isTwoFactorEnable,
            }
        })

        return updatedUser;
    }
}

export default new UserService();