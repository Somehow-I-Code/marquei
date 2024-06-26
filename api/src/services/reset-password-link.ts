class ResetPasswordService {
    sendResetPasswordLink(token: string) {
        const slackHookUrl = process.env.SLACK_HOOK_RESET_PASSWORD;

        if (typeof slackHookUrl === "string") {
            fetch(slackHookUrl, {
                method: "POST",
                body: JSON.stringify({
                    text: `Clique no link para alterar sua senha: http://localhost:3001/password-reset/${token}`,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });
        }
    }
}

const resetPasswordService = new ResetPasswordService();
export default resetPasswordService;

