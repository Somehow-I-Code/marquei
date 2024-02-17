import { FilledPlusIcon, MenuHamburgerIcon, SearchIcon } from "@/components/Icons";

const BottomFloatingMenu = () => {
  return (
    <section className="bg-purple-950 fixed bottom-2 left-4 right-4 flex justify-between px-10 pt-2 pb-2 items-center rounded-full mx-2">
      <div>
        <button>
          <SearchIcon />
        </button>
      </div>

      <div className="bg-white flex w-auto px-2 py-1 rounded-full">
        <button>
          <FilledPlusIcon />
        </button>
        <p className="text-black font-bold">Agendar</p>
      </div>

      <div>
        <button>
          <MenuHamburgerIcon />
        </button>
      </div>
    </section>
  );
};

export default BottomFloatingMenu;
