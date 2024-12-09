class EmailService {
    sendEmailWithPassword(email: string, password: string) {
        const slackHookUrl = process.env.SLACK_HOOK_PASSWORDS;

        if (typeof slackHookUrl === "string") {
            fetch(slackHookUrl, {
                method: "POST",
                body: JSON.stringify({
                    text: `Novos email e senha gerados ${email} ${password}`,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });
        }

        console.log(`Pra logar na plataforma use a senha: ${password}`);
    }

    sendResetPasswordLink(token: string) {
        const slackHookUrl = process.env.SLACK_HOOK_RESET_PASSWORD;

        if (typeof slackHookUrl === "string") {
            fetch(slackHookUrl, {
                method: "POST",
                body: JSON.stringify({
                    text: `Clique no link para alterar sua senha: http://localhost:3001/auth/reset-password/${token}`,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });
        }
    }
}

const emailService = new EmailService();
export type EmailServiceType = typeof emailService;
export default emailService;
