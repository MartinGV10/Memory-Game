import axios from 'axios'
import { useEffect, useState } from 'react'

function Pokemon() {
    const [pokemon, setPokemon] = useState([])
    const [error, setError] = useState(null)

    const ids = [1, 2, 3, 4, 5, 6, 7, 8]

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const pokePromise = Array.from({ length: 8 }, (_, i) =>
                axios.get(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
                );

                const responses = await Promise.all(pokePromise)

                const pokemonData = responses.map(res => res.data)

                setPokemon(pokemonData)
            }

            catch (err) {
                setError('Pokemon not found')
            }
        }

        fetchPokemon()

    }, [])

    return(
        <>
        <div className="cont">
            {pokemon.map((poke) => (
                <div className="item" key={poke.id}>
                    <img src={poke.sprites.front_default} alt="" className="pic" />
                    <p className="name">{poke.name.toUpperCase()}</p>
                </div>
            ))}
        </div>
        </>
    )
}

export default Pokemon