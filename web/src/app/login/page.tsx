import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
    return (
        <section className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col items-center space-y-2">
                <h1 className="text-xl font-bold">Tela de Login</h1>
                <Button>
                    <Link href="/">Login</Link>
                </Button>
            </div>
        </section>
    );
}

