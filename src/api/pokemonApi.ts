import axios from "axios";

export const fetchPokemonList = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    );

    console.log("API Response:", response.data);

    return response.data;

  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};