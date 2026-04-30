import { useEffect, useState } from "react"
import { fetchPokemonList } from "../api/pokemonApi"

export const usePokemon = () => {

  const [list, setList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {

    const loadData = async () => {

      try {

        const res = await fetchPokemonList()

        setList(res.results)

      } catch (e) {

        setErrMsg("Failed to load Pokémon")

      } finally {

        setIsLoading(false)

      }

    }

    loadData()

  }, [])

  return {
    pokemon: list,
    loading: isLoading,
    error: errMsg
  }

}