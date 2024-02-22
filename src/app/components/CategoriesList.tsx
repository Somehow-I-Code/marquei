import Pill from "./Pill";

type CategoriesListProps = {
  list: Array<string>;
};

export default function CategoriesList({ list }: CategoriesListProps) {
  const active = "Categoria 1";

  return (
    <nav>
      <ul className="flex items-center gap-5 px-6 overflow-auto hide-scrollbar">
        {list?.map((category) => {
          return (
            <li key={category} className="whitespace-nowrap">
              {active === category ? <Pill>{category}</Pill> : category}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
