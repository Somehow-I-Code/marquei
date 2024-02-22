import {
  FilledPlusIcon,
  MenuHamburgerIcon,
  SearchIcon,
} from "@/components/Icons";
import Button from "./Button";

export default function BottomFloatingMenu() {
  return (
    <section className="bg-indigo-950 fixed bottom-2 left-4 right-4 flex justify-between py-2 px-5 items-center rounded-full">
      <Button variant="transparent">
        <SearchIcon />
      </Button>

      <Button variant="white" className="flex items-center gap-1 rounded-full">
        <FilledPlusIcon />
        <p className="text-indigo-950 font-bold text-xs">Agendar</p>
      </Button>

      <Button variant="transparent">
        <MenuHamburgerIcon />
      </Button>
    </section>
  );
}
