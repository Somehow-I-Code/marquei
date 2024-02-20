type CategoriesListProps = {
  list: Array<string>;
};

export default function CategoriesList({ list }: CategoriesListProps) {
  return (
    <nav>
      <ul className="flex gap-5 px-6 overflow-auto hide-scrollbar">
        {list?.map((category) => {
          return (
            <li key={category} className="whitespace-nowrap">
              {category}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
