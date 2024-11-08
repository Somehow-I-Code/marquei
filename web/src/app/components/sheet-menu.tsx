import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import Home from "../user-menu/assests/home.svg";
import Categories from "../user-menu/assests/categories.svg";
import Resources from "../user-menu/assests/resources.svg";
import ManagerProfiles from "../user-menu/assests/manager-profiles.svg";
import Profile from "../user-menu/assests/profile.svg";
import Logout from "../user-menu/assests/logout.svg";
import Company from "../user-menu/assests/company.svg";
import LogoutMenu from "../user-menu/components/logout-sheet-menu";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getSession from "../utis/get-session";
import { jwtDecode } from "jwt-decode";

async function doLogout() {
    "use server";
    cookies().delete("session");

    redirect("/login");
}

export default async function SheetMenu() {
    const session = getSession();

    if (!session) {
        return redirect("/login");
    }

    const decoded = jwtDecode(session) as {
        level: string;
    };

    return (
        <SheetContent>
            <SheetHeader className="flex gap-8">
                <SheetTitle className="flex justify-start items-start text-2xl font-semibold mt-6">
                    Menu
                </SheetTitle>
            </SheetHeader>

            {decoded.level === "USER" && (
                <div className="flex flex-col items-start gap-4 mt-6">
                    <div className="flex items-center gap-2 font-medium hover:underline">
                        <Home />
                        <Link href="/">Tela inicial</Link>
                    </div>

                    <div className="flex items-center gap-2 font-medium">
                        <Resources />
                        <span>Recursos</span>
                    </div>

                    <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                        <Link href="/resource-details">Detalhe de recurso</Link>
                    </div>

                    <div className="flex items-center gap-2 font-medium hover:underline">
                        <Profile />
                        <Link href="/profile">Perfil</Link>
                    </div>
                </div>
            )}

            {decoded.level === "ADMIN" && (
                <div className="flex flex-col items-start gap-4 mt-6">
                    <div className="flex items-center gap-2 font-medium hover:underline">
                        <Home />
                        <Link href="/">Tela inicial</Link>
                    </div>

                    <div className="flex items-center gap-2 font-medium hover:underline">
                        <Categories />
                        <Link href="/new-category">Categorias</Link>
                    </div>

                    <div className="flex items-center gap-2 font-medium">
                        <Resources />
                        <span>Recursos</span>
                    </div>

                    <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                        <Link href="/new-resource">Novo recurso</Link>
                    </div>

                    <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                        <Link href="/resource-details">Detalhe de recurso</Link>
                    </div>

                    <div className="flex flex-col items-start gap-4 mt-12">
                        <div className="flex items-center gap-2 font-medium">
                            <ManagerProfiles />
                            <span>Gerenciar perfis</span>
                        </div>

                        <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                            <Link href="/new-profile">Novo perfil</Link>
                        </div>

                        <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                            <Link href="/profiles-list">Lista de perfis</Link>
                        </div>

                        <div className="flex items-center gap-2 font-medium hover:underline">
                            <Profile />
                            <Link href="/profile">Perfil</Link>
                        </div>
                    </div>
                </div>
            )}

            {decoded.level === "SUDO" && (
                <>
                    <div className="flex flex-col items-start gap-4 mt-6">
                        <div className="flex items-center gap-2 font-medium hover:underline">
                            <Home />
                            <span>Tela inicial</span>
                            {/* <Link href="/">Tela inicial</Link> */}
                        </div>

                        <div className="flex items-center gap-2 font-medium hover:underline">
                            <Categories />
                            <Link href="/new-category">Categorias</Link>
                        </div>

                        <div className="flex items-center gap-2 font-medium">
                            <Resources />
                            <span>Recursos</span>
                        </div>

                        <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                            <Link href="/new-resource">Novo recurso</Link>
                        </div>

                        <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                            <Link href="/resource-details">
                                Detalhe de recurso
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-4 mt-12">
                        <div className="flex items-center gap-2 font-medium">
                            <ManagerProfiles />
                            <span>Gerenciar perfis</span>
                        </div>

                        <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                            <Link href="/new-profile">Novo perfil</Link>
                        </div>

                        <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                            <Link href="/profiles-list">Lista de perfis</Link>
                        </div>

                        <div className="flex items-center gap-2 font-medium hover:underline">
                            <Profile />
                            <Link href="/profile">Perfil</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-4 mt-12">
                        <div className="flex items-center gap-2 font-medium">
                            <Company />
                            <span>Empresa</span>
                        </div>
                        <div className="flex items-center gap-2 px-8 font-medium hover:underline">
                            <Link href="/new-company">Nova empresa</Link>
                        </div>
                    </div>
                </>
            )}

            <div className="absolute bottom-12 flex items-center gap-2 font-medium hover:underline">
                <Logout />
                <LogoutMenu doLogout={doLogout} />
            </div>
        </SheetContent>
    );
}
