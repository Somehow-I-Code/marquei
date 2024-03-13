import { Badge } from "@/components/ui/badge";

type CategoriesListProps = {
  list: Array<string>;
};

export default function CategoriesList({ list }: CategoriesListProps) {
  const active = "Médicos";

  return (
    <nav>
      <ul className="flex items-center gap-5 px-6 overflow-auto hide-scrollbar">
        {list?.map((category) => {
          return (
            <li key={category} className="whitespace-nowrap text-xs">
              
              {active === category ? <Badge>{category}</Badge> : category}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}