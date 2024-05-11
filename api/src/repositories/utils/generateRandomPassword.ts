export default function generatePassword(length = 10) {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const password = Array.from({
        length,
    }).reduce<string>((acc) => {
        return acc + chars.charAt(Math.floor(Math.random() * chars.length));
    }, "");

    return password;
}
