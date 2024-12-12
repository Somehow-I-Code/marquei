"use client";

import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

type CategoriesListProps = {
    list: Array<string>;
};

export default function CategoriesList({ list }: CategoriesListProps) {
    const [activeCategory, setActiveCategory] = useState<string>("");

    useEffect(() => {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveCategory(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        });

        list.forEach((category) => {
            const element = document.getElementById(category);

            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            list.forEach((category) => {
                const element = document.getElementById(category);

                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [list]);

    const handleCategoryClick = (category: string) => {
        const element = document.getElementById(category);
        const offset = 75; // Adjust this value to your desired offset

        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <nav className="sticky top-0 bg-white py-4 z-10">
            <ul className="flex items-center gap-5 px-6 overflow-auto hide-scrollbar">
                {list?.map((category) => {
                    return (
                        <li
                            key={category}
                            className="whitespace-nowrap text-xs"
                        >
                            <a
                                href={`#${category}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCategoryClick(category);
                                }}
                            >
                                {activeCategory === category ? (
                                    <Badge>{category}</Badge>
                                ) : (
                                    category
                                )}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
