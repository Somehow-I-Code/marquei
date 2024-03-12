import { Button } from "@/components/ui/button";
import { Menu, Plus, SearchIcon } from "@/components/ui/icons";

export default function BottomFloatingMenu() {
    return (
        <section className="bg-indigo-950 fixed bottom-2 left-4 right-4 flex justify-between py-2 px-5 items-center rounded-full">
            <Button variant="ghost">
                <SearchIcon className="text-slate-50" />
            </Button>

            <Button
                variant="outline"
                className="flex items-center gap-1 rounded-full"
            >
                <Plus />
                <p className="text-indigo-950 font-bold text-xs">Agendar</p>
            </Button>

            <Button variant="ghost">
                <Menu className="text-slate-50" />
            </Button>
        </section>
    );
}
