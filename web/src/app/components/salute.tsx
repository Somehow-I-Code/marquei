import { readCookieData } from "../actions";

export default async function Salute() {
    const loggedUser = await readCookieData();

    return (
        <span className="text-sm font-bold text-indigo-950">
            {loggedUser ? `Olá, ${loggedUser.name}` : "bem-vindo!"}
        </span>
    );
}
