import { Menu, Plus, SearchIcon } from "lucide-react";
import Button from "./Button";

export default function BottomFloatingMenu() {
  return (
    <section className="bg-indigo-950 fixed bottom-2 left-4 right-4 flex justify-between py-2 px-5 items-center rounded-full">
      <Button variant="transparent">
        <SearchIcon className="text-slate-50" />
      </Button>

      <Button variant="white" className="flex items-center gap-1 rounded-full">
        <Plus className="text-indigo-950" />
        <p className="text-indigo-950 font-bold">Agendar</p>
      </Button>

      <Button variant="transparent">
        <Menu className="text-slate-50" />
      </Button>
    </section>
  );
}
