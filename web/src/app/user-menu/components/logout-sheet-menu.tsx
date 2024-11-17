"use client";

type LogoutMenuProps = {
    doLogout: () => void;
};

export default function LogoutMenu({ doLogout }: LogoutMenuProps) {
    return (
        <button
            className="font-bold font-medium text-red-500"
            onClick={async () => doLogout()}
        >
            Sair
        </button>
    );
}
