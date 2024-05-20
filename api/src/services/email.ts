class EmailService {
    sendEmailWithPassword(password: string) {
        console.log(`Pra logar na plataforma use a senha: ${password}`);
    }
}

const emailService = new EmailService();
export default emailService;
