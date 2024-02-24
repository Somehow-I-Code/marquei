"use client";

import BottomFloatingMenu from "./components/bottom-floating-menu";
import CategoriesList from "./components/categories-list";
import CompanyLogo from "./components/company-logo";
import ResourcesList from "./components/resources-list";
import Salute from "./components/salute";
import { CATEGORIESLIST, RESOURCES } from "./data";

export default function Home() {
  return (
    <main>
      <header className="flex justify-between items-end px-6 py-12">
        <CompanyLogo />
        <Salute>Francisco</Salute>
      </header>

      <section className="flex flex-col gap-6 pb-28">
        <CategoriesList list={CATEGORIESLIST} />

        <div>
          <ResourcesList title="Categoria 1" list={RESOURCES} />
        </div>
      </section>

      <BottomFloatingMenu />
    </main>
  );
}
