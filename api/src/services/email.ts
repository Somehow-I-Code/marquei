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
}

const emailService = new EmailService();
export default emailService;
