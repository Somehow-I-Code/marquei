"use client";

import { Button } from "@/components/ui/button";

type LogoutButtonProps = {
    doLogout: () => void;
};

export default function LogoutButton({ doLogout }: LogoutButtonProps) {
    return (
        <Button
            variant="destructive"
            className="font-bold text-base"
            onClick={async () => await doLogout()}
        >
            SAIR
        </Button>
    );
}
