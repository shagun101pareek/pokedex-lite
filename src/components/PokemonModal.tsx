import { X } from "lucide-react"
import { useEffect, useState } from "react"

type PokemonModalProps = {
  data: any
  closeModal: () => void
}

const statBarColors: Record<string, string> = {
  hp: "bg-green-500",
  attack: "bg-red-500",
  defense: "bg-blue-500",
  "special-attack": "bg-purple-500",
  "special-defense": "bg-cyan-500",
  speed: "bg-yellow-500",
}

const headerBg: Record<string, string> = {
  grass: "bg-green-500",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  poison: "bg-purple-500",
  flying: "bg-indigo-400",
  normal: "bg-gray-400",
  fairy: "bg-pink-400",
  bug: "bg-lime-500",
  ground: "bg-amber-500",
}

function PokemonModal({
  data,
  closeModal,
}: PokemonModalProps) {

  const [desc, setDesc] =
    useState<string>("")

  const [evoList, setEvoList] =
    useState<any[]>([])

  useEffect(() => {

    if (!data) return

    const loadSpecies = async () => {

      try {

        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${data.id}`
        )

        const species =
          await res.json()

        const english =
          species.flavor_text_entries.find(
            (e: any) =>
              e.language.name === "en"
          )

        setDesc(
          english?.flavor_text.replace(
            /\f/g,
            " "
          ) || ""
        )

        const evoRes = await fetch(
          species.evolution_chain.url
        )

        const evoData =
          await evoRes.json()

        const names: string[] = []

        let chain = evoData.chain

        while (chain) {

          names.push(
            chain.species.name
          )

          chain =
            chain.evolves_to[0]

        }

        const evoImgs =
          await Promise.all(

            names.map(async (n) => {

              const res =
                await fetch(
                  `https://pokeapi.co/api/v2/pokemon/${n}`
                )

              const p =
                await res.json()

              return {

                name: p.name,

                image:
                  p.sprites.other[
                    "official-artwork"
                  ].front_default,

              }

            })

          )

        setEvoList(evoImgs)

      } catch (err) {

        console.error(
          "species fetch failed:",
          err
        )

      }

    }

    loadSpecies()

  }, [data])

  if (!data) return null

  const mainType =
    data.types[0].type.name

  const headColor =
    headerBg[mainType] ||
    "bg-gray-400"

  return (

    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl overflow-hidden w-[420px] shadow-xl relative">

        <div
          className={`relative ${headColor} h-52 flex flex-col items-center justify-center text-white`}
        >

          <div className="absolute w-64 h-64 bg-white/10 rounded-full top-[-80px] right-[-80px]" />

          <div className="absolute w-40 h-40 bg-white/10 rounded-full bottom-[-40px] left-[-40px]" />

          <button
            onClick={closeModal}
            className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/30"
          >
            <X size={18} />
          </button>

          <p className="text-sm opacity-80">
            #{data.id
              .toString()
              .padStart(3, "0")}
          </p>

          <h2 className="text-2xl font-bold capitalize">
            {data.name}
          </h2>

          <div className="flex gap-2 mt-2">

            {data.types.map(
              (t: any) => (

                <span
                  key={t.type.name}
                  className="px-3 py-1 rounded-full bg-white/20 text-sm capitalize"
                >
                  {t.type.name}
                </span>

              )
            )}

          </div>

          <img
            src={
              data.sprites.other[
                "official-artwork"
              ].front_default
            }
            alt={data.name}
            className="w-36 h-36 absolute bottom-[-80px]"
          />

        </div>

        <div className="pt-16 px-6 pb-6 bg-gray-50">

          {desc && (

            <div className="mb-6 mt-4 text-center text-gray-600 text-sm">
              {desc}
            </div>

          )}

          {evoList.length > 0 && (

            <div className="mb-6">

              <h3 className="text-gray-400 font-semibold mb-3 uppercase tracking-wide">
                Evolution Chain
              </h3>

              <div className="flex items-center justify-center gap-4">

                {evoList.map(
                  (evo, i) => (

                    <div
                      key={i}
                      className="flex items-center gap-4"
                    >

                      <div className="flex flex-col items-center">

                        <img
                          src={evo.image}
                          alt={evo.name}
                          className="w-16 h-16 object-contain"
                        />

                        <p className="text-xs capitalize mt-1">
                          {evo.name}
                        </p>

                      </div>

                      {i !==
                        evoList.length - 1 && (

                        <span className="text-lg">
                          →
                        </span>

                      )}

                    </div>

                  )
                )}

              </div>

            </div>

          )}

          <div>

            <h3 className="text-gray-400 font-semibold mb-4 uppercase tracking-wide">
              Base Stats
            </h3>

            <div className="space-y-3">

              {data.stats.map(
                (s: any) => {

                  const statName =
                    s.stat.name

                  const statVal =
                    s.base_stat

                  return (

                    <div
                      key={statName}
                      className="flex items-center gap-3"
                    >

                      <p className="w-28 text-sm capitalize text-gray-600">
                        {statName.replace("-", " ")}
                      </p>

                      <p className="w-10 text-sm font-semibold">
                        {statVal}
                      </p>

                      <div className="flex-1 bg-gray-200 rounded-full h-2">

                        <div
                          className={`h-2 rounded-full ${
                            statBarColors[
                              statName
                            ]
                          }`}
                          style={{
                            width: `${Math.min(
                              statVal,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>

                  )

                }
              )}

            </div>

          </div>

          <div className="mt-8">

            <h3 className="text-gray-400 font-semibold mb-4 uppercase tracking-wide">
              Profile
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <div className="bg-white rounded-xl p-4 text-center shadow-sm">

                <p className="text-2xl font-bold text-gray-800">
                  {(data.height / 10).toFixed(1)} m
                </p>

                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Height
                </p>

              </div>

              <div className="bg-white rounded-xl p-4 text-center shadow-sm">

                <p className="text-2xl font-bold text-gray-800">
                  {(data.weight / 10).toFixed(1)} kg
                </p>

                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Weight
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}

export default PokemonModal