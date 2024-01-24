"use client";
import Image from "next/image";
import resourcePlaceholder from "./assets/resource-placeholder.png";
import "./style.css";

export default function Home() {
  return (
    <div className="resource-container">
      <h1>Categoria 1</h1>

      <ul>
        <li>
          <a>
            <div className="resource-item-image">
              <Image
                src={resourcePlaceholder}
                alt="Placeholder image with a clock and agenda."
              ></Image>
            </div>

            <div className="resource-item-info-container">
              <div className="resource-item-info">
                <h2>Resource #1</h2>

                <p>Here we have some text helping describe that resource</p>
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

        <li>
          <a>
            <div className="resource-item-image">
              <Image
                src={resourcePlaceholder}
                alt="Placeholder image with a clock and agenda."
              ></Image>
            </div>

            <div className="resource-item-info-container">
              <div className="resource-item-info">
                <h2>Resource #2</h2>

                <p>Here we have some text helping describe that resource</p>
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

        <li>
          <a>
            <div className="resource-item-image">
              <Image
                src={resourcePlaceholder}
                alt="Placeholder image with a clock and agenda."
              ></Image>
            </div>

            <div className="resource-item-info-container">
              <div className="resource-item-info">
                <h2>Resource #3</h2>

                <p>Here we have some text helping describe that resource</p>
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

        <li>
          <a>
            <div className="resource-item-image">
              <Image
                src={resourcePlaceholder}
                alt="Placeholder image with a clock and agenda."
              ></Image>
            </div>

            <div className="resource-item-info-container">
              <div className="resource-item-info">
                <h2>Resource #4</h2>

                <p>Here we have some text helping describe that resource</p>
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
      </ul>
    </div>
  );
}
