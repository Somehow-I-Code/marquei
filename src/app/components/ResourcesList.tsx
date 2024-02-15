import ResourcesCard from "./ResourcesCard";

type Resource = {
  name: string;
  description: string;
};

type ResourcesListProps = {
  list: Array<Resource>;
};

export default function ResourcesList({ list }: ResourcesListProps) {
  return (
    <div className="flex flex-col gap-6 mx-6">
      <h1 className="text-violet-950 text-3xl font-bold">Categoria 1</h1>

      <ul className="grid grid-cols-2 gap-8">
        {list?.map((resource) => {
          return <ResourcesCard resource={resource} />;
        })}
      </ul>
    </div>
  );
}
