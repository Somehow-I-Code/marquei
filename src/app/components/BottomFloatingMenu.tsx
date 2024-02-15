const BottomFloatingMenu = () => {
  return (
    <section className="bg-purple-950 fixed bottom-2 left-4 right-4 flex justify-between px-10 pt-2 pb-2 items-center rounded-full mx-2">
      <div>
        <button>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="7" stroke="white" stroke-width="2" />
            <path
              d="M20 20L17 17"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="bg-white flex w-auto px-2 py-1 rounded-full">
        <button>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 6L12.5 18"
              stroke="#33363F"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M18.5 12L6.5 12"
              stroke="#33363F"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <p className="text-black font-bold">Agendar</p>
      </div>

      <div>
        <button>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7H19"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M5 12H19"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M5 17H19"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default BottomFloatingMenu;
