"use client";

import BottomFloatingMenu from "./components/BottomFloatingMenu";
import CategoriesList from "./components/CategoriesList";
import CompanyLogo from "./components/CompanyLogo";
import ResourcesList from "./components/ResourcesList";
import Salute from "./components/Salute";
import { CATEGORIESLIST, RESOURCES } from "./data";

export default function Home() {
  return (
    <main>
      <header className="flex justify-between items-end px-6 py-12">
        <CompanyLogo />

        <Salute>Francisco</Salute>
      </header>

      <section className="flex flex-col gap-6">
        <CategoriesList list={CATEGORIESLIST} />

        <div>
          <ResourcesList title="Categoria 1" list={RESOURCES} />
        </div>
      </section>

      <BottomFloatingMenu />
    </main>
  );
}
