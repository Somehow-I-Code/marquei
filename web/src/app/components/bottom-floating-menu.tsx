import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Menu, Plus } from "@/components/ui/icons";
import MenuSearchAction from "./menu-search-action";
import ScheduleDrawer from "./schedule-drawer";

export default function BottomFloatingMenu({ resources }) {
    return (
        <section className="bg-indigo-950 fixed bottom-2 left-4 right-4 flex justify-between py-2 px-5 items-center rounded-full">
            <MenuSearchAction resources={resources} />

            <Drawer>
                <ScheduleDrawer />
                <DrawerTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex items-center gap-1 rounded-full"
                    >
                        <Plus />
                        <p className="text-indigo-950 font-bold text-xs">
                            Agendar
                        </p>
                    </Button>
                </DrawerTrigger>
            </Drawer>
            <Button variant="ghost">
                <Menu className="text-slate-50" />
            </Button>
        </section>
    );
}
