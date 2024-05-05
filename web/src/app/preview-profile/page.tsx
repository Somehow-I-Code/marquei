import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserImage from "./assets/user.svg";
import EmailPreviewProfile from "./components/email-profile";
import NameAndOcupation from "./components/name-and-ocupation";
import ProfileLevelPreview from "./components/profile-level";

export default async function PreviewProfile() {
    return (
        <section>
            <div className="flex justify-center items-center bg-indigo-950 h-24">
                <div className="relative mt-24 w-28 h-28 rounded-full flex items-center justify-center overflow-hidden">
                    <UserImage />
                </div>
            </div>

            <NameAndOcupation />

            <div className="flex flex-col p-6 mt-[-75px]">
                <EmailPreviewProfile />
                <ProfileLevelPreview />
            </div>

            <div className="flex flex-col p-6 gap-2 mt-[-25px]">
                <Button className="font-bold text-base">
                    <Link href="">ALTERAR SENHA</Link>
                </Button>
                <Button className="font-bold text-base bg-white text-indigo-950 border border-indigo-950">
                    <Link href="/">VOLTAR</Link>
                </Button>
                <Button className="font-bold text-base bg-white text-rose-600 border border-rose-600">
                    <Link href="login">SAIR</Link>
                </Button>
            </div>
        </section>
    );
}
