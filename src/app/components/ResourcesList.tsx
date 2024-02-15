import { RESOURCES } from "../data";
import ResourcesCard from "./ResourcesCard";

export default function ResourcesList() {
  return (
    <div className="flex flex-col gap-6 mx-6">
      <h1 className="text-violet-950 text-3xl font-bold">Categoria 1</h1>

      <ul>
        <ResourcesCard list={RESOURCES} />
      </ul>
    </div>
  );
}
