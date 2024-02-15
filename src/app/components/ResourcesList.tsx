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
    <ul className="resource-item-list">
      {list?.map((resource) => {
        return (
          <li key={resource.name}>
            <a className="resource-item-link">
              <div className="resource-item-image">
                <Image
                  src={resource.image || resourcePlaceholder}
                  alt="Placeholder image with a clock and agenda."
                ></Image>
              </div>

              <div className="resource-item-info-container">
                <div className="resource-item-info">
                  <h2 className="resource-item-name">{resource.name}</h2>

                  <p className="resource-item-description">
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
