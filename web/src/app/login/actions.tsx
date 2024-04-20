"use server";

export async function login(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("http://api:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    // se a resposta foi de sucesso (pode checar o status pra isso) a gente redireciona pra home

    // se a reposta foi de falha (pdo checar o status pra isso) a gente pede pro usuário checar as infos
}
