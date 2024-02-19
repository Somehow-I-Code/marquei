import Image, { StaticImageData } from "next/image";
import resourcePlaceholder from "../assets/resource-placeholder.png";

type Resource = {
  name: string;
  description: string;
  image?: StaticImageData;
};

type ResourcesListProps = {
  list: Array<Resource>;
};

export default function ResourcesList({ list }: ResourcesListProps) {
  return (
    <ul className="grid grid-cols-2 gap-8">
      {list?.map((resource) => {
        return (
          <li key={resource.name}>
            <a className="flex flex-col gap-2">
              <div className="aspect-square rounded-lg bg-cyan-200 shadow-sm flex items-center justify-center">
                <Image
                  src={resource.image || resourcePlaceholder}
                  alt="Placeholder image with a clock and agenda."
                ></Image>
              </div>

              <div className="flex items-center gap-1">
                <div className="flex flex-col gap-2">
                  <h2 className="text-slate-800 text-sm font-bold">
                    {resource.name}
                  </h2>

                  <p className="text-slate-500 text-xs">
                    {resource.description}
                  </p>
                </div>

                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L7 7.5L1 13.5"
                    stroke="#33363F"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
