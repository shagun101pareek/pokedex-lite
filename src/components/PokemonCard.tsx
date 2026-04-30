import { Heart } from "lucide-react"

type PokemonCardProps = {
  title: string
  img: string
  pokeId: number
  pokeTypes: string[]
  fav: boolean
  toggleFav: (id: number) => void
  openDetails: () => void
}

const badgeColors: Record<string, string> = {
  grass: "bg-green-200 text-green-800",
  fire: "bg-orange-200 text-orange-800",
  water: "bg-blue-200 text-blue-800",
  electric: "bg-yellow-200 text-yellow-800",
  poison: "bg-purple-200 text-purple-800",
  flying: "bg-indigo-200 text-indigo-800",
  normal: "bg-gray-200 text-gray-800",
  fairy: "bg-pink-200 text-pink-800",
  ground: "bg-amber-200 text-amber-800",
  bug: "bg-lime-200 text-lime-800",
}

const bgByType: Record<string, string> = {
  grass: "bg-green-50",
  fire: "bg-orange-50",
  water: "bg-blue-50",
  electric: "bg-yellow-50",
  poison: "bg-purple-50",
  flying: "bg-indigo-50",
  normal: "bg-gray-50",
  fairy: "bg-pink-50",
  ground: "bg-amber-50",
  bug: "bg-lime-50",
}

function PokemonCard({
  title,
  img,
  pokeId,
  pokeTypes,
  fav,
  toggleFav,
  openDetails
}: PokemonCardProps) {

  const mainType = pokeTypes[0]
  const bg = bgByType[mainType] || "bg-white"

  return (
    <div
      onClick={openDetails}
      className={`${bg} relative shadow-md rounded-2xl p-5 w-60 text-center hover:shadow-lg transition duration-200 cursor-pointer`}
    >

      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleFav(pokeId)
        }}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition"
      >
        <Heart
          size={16}
          className={
            fav
              ? "fill-red-500 text-red-500"
              : "text-gray-400"
          }
        />
      </button>

      <p className="text-sm text-gray-400 text-left font-medium">
        #{pokeId.toString().padStart(3, "0")}
      </p>

      <img
        src={img}
        alt={title}
        className="mx-auto w-28 h-28 my-2"
      />

      <h2 className="text-lg font-semibold capitalize text-gray-800">
        {title}
      </h2>

      <div className="flex justify-center gap-2 mt-3 flex-wrap">

        {pokeTypes.map((t) => (

          <span
            key={t}
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              badgeColors[t] ||
              "bg-gray-200 text-gray-800"
            }`}
          >
            {t}
          </span>

        ))}

      </div>

    </div>
  )
}

export default PokemonCard