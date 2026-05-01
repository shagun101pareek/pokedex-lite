import { Heart, SlidersHorizontal } from "lucide-react"
import GoogleLoginButton from "./GoogleLogin"

type HeaderProps = {
  favCount: number
  favView: boolean
  toggleFavView: () => void
  toggleFilterPanel: () => void

  user: any
  setUser: (user: any) => void
  handleLogout: () => void
}

function Header({
  favCount,
  favView,
  toggleFavView,
  toggleFilterPanel,
  user,
  setUser,
  handleLogout,
}: HeaderProps) {

  return (

    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">

      {/* Logo Section */}
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

      {/* Right Side Controls */}
      <div className="flex items-center gap-4">

        {/* Filters Button */}
        <button
          onClick={toggleFilterPanel}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>

        {/* Favorites Button */}
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

        {/* OAuth Section */}
        {user ? (

          <div className="flex items-center gap-2 ml-2">

            <img
              src={user.picture}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />

            <span className="text-sm font-medium">
              {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>

        ) : (

          <GoogleLoginButton
            onLogin={setUser}
          />

        )}

      </div>

    </div>

  )

}

export default Header