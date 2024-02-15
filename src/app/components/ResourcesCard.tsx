type Resource = {
  name: string;
  description: string;
};

type ResourceCardProps = {
  resource: Resource;
};

export default function ResourcesCard({ resource }: ResourceCardProps) {
  return (
    <li key={resource.name}>
      <a className="flex flex-col gap-2">
        <div className="aspect-square rounded-lg bg-gradient-to-bl from-violet-400 to-violet-800  shadow-sm flex items-center justify-center" />

        <div className="flex items-center gap-1">
          <div className="flex flex-col gap-2">
            <h2 className="text-violet-950 text-sm font-bold">
              {resource.name}
            </h2>

            <p className="text-slate-500 text-xs">{resource.description}</p>
          </div>

          <svg
            width="9"
            height="15"
            viewBox="0 0 9 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1.5L7 7.5L1 13.5" stroke="#33363F" strokeWidth="2" />
          </svg>
        </div>
      </a>
    </li>
  );
}
