export function getJwtSecret() {
    const secret = process.env.JWT_SECRET;

    if (secret === undefined) {
        throw new Error("Configuração de token não aplicada");
    }

    return secret;
}
