import { Resources } from "@/types/resources";
import ResourcesCard from "./resources-card";

type ResourcesListProps = {
    title: string;
    list: Resources;
};

export default function ResourcesList({ title, list }: ResourcesListProps) {
    return (
        <div id={title} className="flex flex-col gap-6 mx-6">
            <h1 className="text-violet-950 text-3xl font-bold">{title}</h1>

            <ul className="grid grid-cols-2 gap-8">
                {list?.map((resource) => {
                    return (
                        <ResourcesCard
                            key={resource.name}
                            resource={resource}
                        />
                    );
                })}
            </ul>
        </div>
    );
}
