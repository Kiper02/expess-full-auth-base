declare class NodeMailerService {
    private transporter;
    constructor();
    sendConfirmationEmail(email: string, token: string): Promise<any>;
    sendPasswordResetEmail(email: string, token: string): Promise<any>;
    private sendMail;
}
declare const _default: NodeMailerService;
export default _default;
