import { useEffect, useState } from "react"
import PokemonCard from "./components/PokemonCard"
import Header from "./components/Header"
import PokemonModal from "./components/PokemonModal"

type Pokemon = {
  id: number
  name: string
  image: string
  types: string[]
}

const typesList = [
  "grass","fire","water","electric",
  "poison","flying","normal","fairy",
  "ground","bug","psychic","ice",
  "dragon","ghost","dark","steel",
  "rock","fighting",
]

function App() {

  const [list, setList] = useState<Pokemon[]>([])
  const [allNames, setAllNames] = useState<any[]>([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [user, setUser] = useState<any>(null);

  const [favIds, setFavIds] = useState<number[]>(() => {

    try {

      const saved = localStorage.getItem("favorites")

      return saved
        ? JSON.parse(saved)
        : []

    } catch {

      return []

    }

  })

  const [activeTypes, setActiveTypes] = useState<string[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [favMode, setFavMode] = useState(false)

  const [selected, setSelected] =
    useState<any>(null)

  const limit = 12

  const totalCount = 1302
  const totalPages = Math.ceil(totalCount / limit)
  const page = offset / limit + 1

  const goToPage = (p: number) => {

    if (p < 1 || p > totalPages) return

    const newOffset = (p - 1) * limit

    setOffset(newOffset)

  }

  useEffect(() => {

    const loadNames = async () => {

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=1302`
      )

      const data = await res.json()

      setAllNames(data.results)

    }

    loadNames()

  }, [])
  useEffect(() => {

  const savedUser = localStorage.getItem("user");

  if (savedUser) {

    setUser(JSON.parse(savedUser));

  }

}, []);

  const handleLogout = () => {

  localStorage.removeItem("user");

  setUser(null);

};

  const loadPokemon = async () => {

    try {

      setLoading(true)

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      )

      const data = await res.json()

      const detailed =
        await Promise.all(

          data.results.map(
            async (p: any) => {

              const r =
                await fetch(p.url)

              const d =
                await r.json()

              return {

                id: d.id,
                name: d.name,
                image:
                  d.sprites.front_default,
                types:
                  d.types.map(
                    (t: any) =>
                      t.type.name
                  ),

              }

            }
          )

        )

      setList(detailed)

    } catch (e) {

      console.error(e)

    } finally {

      setLoading(false)

    }

  }

  const searchPokemon = async () => {

    try {

      setLoading(true)

      const matches =
        allNames
          .filter((p) =>
            p.name.includes(
              query.toLowerCase()
            )
          )
          .slice(0, 12)

      const detailed =
        await Promise.all(

          matches.map(
            async (p: any) => {

              const r =
                await fetch(p.url)

              const d =
                await r.json()

              return {

                id: d.id,
                name: d.name,
                image:
                  d.sprites.front_default,
                types:
                  d.types.map(
                    (t: any) =>
                      t.type.name
                  ),

              }

            }
          )

        )

      setList(detailed)

    } catch (e) {

      console.error(e)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    if (query === "") {

      loadPokemon()

    } else {

      searchPokemon()

    }

  }, [query, offset])

  useEffect(() => {

    localStorage.setItem(
      "favorites",
      JSON.stringify(favIds)
    )

  }, [favIds])

  const filtered =
    list

      .filter((p) =>
        activeTypes.length > 0
          ? p.types.some((t) =>
              activeTypes.includes(t)
            )
          : true
      )

      .filter((p) =>
        favMode
          ? favIds.includes(p.id)
          : true
      )

  const toggleFav = (id: number) => {

    setFavIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    )

  }

  const loadFavs = async () => {

    try {

      setLoading(true)

      const detailed =
        await Promise.all(

          favIds.map(
            async (id) => {

              const res =
                await fetch(
                  `https://pokeapi.co/api/v2/pokemon/${id}`
                )

              const d =
                await res.json()

              return {

                id: d.id,
                name: d.name,
                image:
                  d.sprites.front_default,
                types:
                  d.types.map(
                    (t: any) =>
                      t.type.name
                  ),

              }

            }
          )

        )

      setList(detailed)

    } finally {

      setLoading(false)

    }

  }

  const toggleType = (type: string) => {

    setActiveTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    )

  }

  const openDetails = async (id: number) => {

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    )

    const data = await res.json()

    setSelected(data)

  }

  return (

  <div className="min-h-screen bg-gray-100">

    <Header
  favCount={favIds.length}
  favView={favMode}
  toggleFavView={() => {

    setFavMode((prev) => {

      const next = !prev

      if (next) {

        loadFavs()

      } else {

        loadPokemon()

      }

      return next

    })

  }}
  toggleFilterPanel={() =>
    setFiltersOpen((prev) => !prev)
  }

  user={user}
  setUser={setUser}
  handleLogout={handleLogout}
/>
    <div className="p-6">

      <div className="max-w-6xl mx-auto mb-6">

        <input
          type="text"
          placeholder="Search Pokémon by name..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="w-full px-5 py-3 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400"
        />

      </div>

      {filtersOpen && (

        <div className="max-w-6xl mx-auto mb-6 pb-4 border-b">

          <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
            Type Filter
          </p>

          <div className="flex flex-wrap gap-2">

            {typesList.map((type) => (

              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`px-3 py-1 rounded-full text-sm capitalize border transition ${
                  activeTypes.includes(type)
                    ? "bg-red-100 text-red-600 border-red-200"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-200"
                }`}
              >
                {type}
              </button>

            ))}

          </div>

        </div>

      )}

      {loading ? (

        <div className="flex justify-center items-center h-40">

          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500"></div>

        </div>

      ) : (

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {filtered.map((p) => (

            <PokemonCard
              key={p.id}
              pokeId={p.id}
              title={p.name}
              img={p.image}
              pokeTypes={p.types}
              fav={favIds.includes(p.id)}
              toggleFav={toggleFav}
              openDetails={() =>
              openDetails(p.id)
          }
            />

          ))}

        </div>

      )}

      {query === "" && !favMode && (

        <div className="flex justify-center items-center gap-3 mt-12">

          <button
            onClick={() =>
              goToPage(page - 1)
            }
            disabled={page === 1}
            className="px-5 py-2 bg-gray-200 rounded-xl shadow disabled:opacity-40 hover:bg-gray-300 transition"
          >
            ← Prev
          </button>

          {[1, 2, 3].map((p) => (

            <button
              key={p}
              onClick={() =>
                goToPage(p)
              }
              className={`w-10 h-10 rounded-xl font-semibold shadow transition ${
                page === p
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {p}
            </button>

          ))}

          <span className="px-2 text-gray-400">
            ...
          </span>

          <button
            onClick={() =>
              goToPage(totalPages)
            }
            className="w-10 h-10 rounded-xl font-semibold bg-gray-200 hover:bg-gray-300 shadow"
          >
            {totalPages}
          </button>

          <button
            onClick={() =>
              goToPage(page + 1)
            }
            disabled={
              page === totalPages
            }
            className="px-5 py-2 bg-gray-200 rounded-xl shadow disabled:opacity-40 hover:bg-gray-300 transition"
          >
            Next →
          </button>

        </div>

      )}

    </div>

    {selected && (

      <PokemonModal
        data={selected}
        closeModal={() =>
        setSelected(null)
  }
/>

    )}

  </div>
  )
}

export default App