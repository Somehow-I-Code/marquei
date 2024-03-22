"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Blocks,
    CalendarPlus2,
    Check,
    SearchIcon,
    Star,
} from "@/components/ui/icons";

export default function MenuSearchAction({ resources }) {
    const [open, setOpen] = useState(false);

    function openCommandDialog() {
        setOpen(true);
    }

    return (
        <div>
            <Button variant="ghost" onClick={openCommandDialog}>
                <SearchIcon className="text-slate-50" />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Busque por recursos, agendamentos..."
                    className="w-[82%]"
                />
                <CommandList>
                    <CommandGroup heading="Sugestões">
                        <CommandItem className="flex items-center gap-3">
                            <CalendarPlus2 /> <span>Agendar</span>
                        </CommandItem>

                        <CommandItem className="flex items-center gap-3">
                            <Blocks />
                            <span>Adicionar recursos</span>
                        </CommandItem>

                        <CommandItem className="flex items-center gap-3">
                            <Check /> <span>Agenda do dia</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandGroup heading="Recursos">
                        <CommandItem className="flex items-center gap-3">
                            <Star /> <span>Recurso #1</span>
                        </CommandItem>

                        <CommandItem className="flex items-center gap-3">
                            <Star />
                            <span>Recurso #6</span>
                        </CommandItem>

                        <CommandItem className="flex items-center gap-3">
                            <Star /> <span>Recurso #9</span>
                        </CommandItem>
                    </CommandGroup>
                    {Object.keys(resources).map((category) => {
                        return (
                            <CommandGroup key={category} heading={category}>
                                {resources[category].map((resource) => {
                                    return (
                                        <CommandItem
                                            key={resource.name}
                                            className="flex items-center gap-3"
                                        >
                                            <Star />{" "}
                                            <span>{resource.name}</span>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        );
                    })}
                </CommandList>
            </CommandDialog>
        </div>
    );
}
