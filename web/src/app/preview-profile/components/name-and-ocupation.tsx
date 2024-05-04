export default function NameAndOcupation() {
    return (
        <div className="flex flex-col p-24 gap-2">
            <span className="flex items-center justify-center text-indigo-950 text-2xl font-bold mt-[-15px]">
                Nome do usuário
            </span>

            <span className="flex items-center justify-center text-amber-600 font-semibold">
                Cargo de ocupação
            </span>
        </div>
    );
}
