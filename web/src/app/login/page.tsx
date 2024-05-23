import CompanyLogo from "../components/company-logo";
import LoginForm, { LoginFormSchema } from "./components/login-form";

export default function LoginPage() {
    // Parâmetro credentials tem a validação e o tipo de LoginFormSchema, que é um objeto com email e password
    async function login(credentials: LoginFormSchema) {
        // Tudo que estiver abaixo de "use server" será um server client
        ("use server");

        // 2 - Prepara o body
        // O body é um objeto que contém as credenciais (email e password)
        const body = {
            ...credentials,
        };

        // 3 - Enviar para o backend
        // Estabelecendo ao conexão com o DB, mostrando o endereço (que está sendo levado atá a função login do api), o método, passando pra string todo o dado do corpo e informando que se trata de uma informação tipo json. Atribuindo o retorno da resposta do login à variável response
        const response = await fetch("http://api:8080/login", {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json",
            },
        });

        // 4 - Checar se deu erro ou não
        // Se o que foi retornado do login for sucesso...
        if (response.status === 200) {
            // Não entendi direito, mas acho que é passando a resposta dos dados do body para token
            const data = (await response.json()) as { token: string };

            return data.token;
        }

        // Não entendi direito, mas acho que é passando a resposta dos dados do body para mensagem em caso de erro
        const data = (await response.json()) as { message: string };

        // Lançando o erro a mensagem
        throw new Error(data.message);
    }

    return (
        <div className="px-6 py-12 flex flex-col flex-wrap gap-4">
            <CompanyLogo />
            <div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold pt-12">
                        Precisa agendar?
                    </h1>
                    <h2>Acesse sua conta agora mesmo!</h2>
                </div>
                <div className="pt-8">
                    // Usando o componente LoginForm, com a prop login (definido
                    lá no loginForm) e seu valor login que é a função assícrona
                    criada acima
                    <LoginForm login={login} />
                </div>
            </div>
        </div>
    );
}
