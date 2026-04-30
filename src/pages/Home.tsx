import { usePokemon } from "../hooks/usePokemon"

const Home = () => {

  const {
    pokemon: pokeList,
    loading: isLoading,
    error: err
  } = usePokemon()

  if (isLoading) {
    return <p>Loading Pokémon...</p>
  }

  if (err) {
    return <p>{err}</p>
  }

  return (
    <div>
      <h1>Pokedex Lite</h1>

      <ul>
        {pokeList.map((p) => (
          <li key={p.name}>
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  )

}

export default Home