import { User } from '@prisma/client';
import { ConfirmationDto } from '../dto/confirmation.dto.js';
import { Request } from 'express';
declare class EmailConfirmationService {
    newVerification(req: Request, dto: ConfirmationDto): Promise<unknown>;
    sendVerificationToken(user: User): Promise<boolean>;
    private generateVerificationToken;
}
declare const _default: EmailConfirmationService;
export default _default;
