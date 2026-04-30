import { Heart, SlidersHorizontal } from "lucide-react"

type HeaderProps = {
  favCount: number
  favView: boolean
  toggleFavView: () => void
  toggleFilterPanel: () => void
}

function Header({
  favCount,
  favView,
  toggleFavView,
  toggleFilterPanel,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src="/pokeball.png"
          alt="Pokeball Logo"
          className="w-10 h-10"
        />

        <h1 className="text-xl font-bold text-red-600">
          Pokedex Lite
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleFilterPanel}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>

        <button
          onClick={toggleFavView}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            favView
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <Heart size={16} />

          Favorites

          <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {favCount}
          </span>
        </button>
      </div>
    </div>
  )
}

export default Header