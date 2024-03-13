import { Button } from "@/components/ui/button";
import { Menu, SearchIcon } from "@/components/ui/icons";
import ScheduleDrawer from "./schedule-drawer";

export default function BottomFloatingMenu() {
  return (
    <section className="bg-indigo-950 fixed bottom-2 left-4 right-4 flex justify-between py-2 px-5 items-center rounded-full">
      <Button variant="ghost">
        <SearchIcon className="text-slate-50" />
      </Button>

      <ScheduleDrawer />

      <Button variant="ghost">
        <Menu className="text-slate-50" />
      </Button>
    </section>
  );
}

