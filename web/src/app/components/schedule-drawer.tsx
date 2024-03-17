import { Button } from "@/components/ui/button";
import {
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

export default function ScheduleDrawer() {
    return (
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>
                    Esse é o placeholder do botão de agendamento.
                </DrawerTitle>
                <DrawerDescription>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolorem recusandae ipsum facilis placeat explicabo illum
                    quia quibusdam fuga! Possimus quam sunt saepe exercitationem
                    voluptatum molestias praesentium in aliquid, minima
                    laboriosam!
                </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
                <Button className="bg-indigo-950">Agendar</Button>
                <DrawerClose>
                    <Button variant="outline">Cancelar</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    );
}
