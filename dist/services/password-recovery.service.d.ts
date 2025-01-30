import { ResetPasswordDto } from "../dto/reset-password.dto.js";
import { NewPasswordDto } from "../dto/new-password.dto.js";
declare class PasswordRecoveryService {
    resetPassword(dto: ResetPasswordDto): Promise<boolean>;
    newPassword(dto: NewPasswordDto, token: string): Promise<boolean>;
    private generatePasswordResetToken;
}
declare const _default: PasswordRecoveryService;
export default _default;
