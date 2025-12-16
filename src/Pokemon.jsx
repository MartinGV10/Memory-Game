import axios from 'axios'
import { useEffect, useState } from 'react'

function Pokemon({ handleScore, score }) {
    const [pokemon, setPokemon] = useState([])
    const [error, setError] = useState(null)
    const [clicked, setClicked] = useState(new Set())

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const pokePromise = Array.from({ length: 12 }, (_, i) =>
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

    const rearrange = () => {
    setPokemon((prev) => {
        const shuffled = [...prev];
        for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    });
    };

    const correctScore = (id) => {
        if (clicked.has(id)) {
            console.log('This was already pressed')
            handleScore(0)
            const newSet = new Set(clicked)
            newSet.clear()
            setClicked(newSet)
            return newSet
        }

        else { 
            handleScore()
        }

        setClicked((prev) => {
            const newSet = new Set(prev)
            newSet.add(id)
            return newSet
        })

        rearrange()
    }

    return(
        <>
        <div className="cont">
            {pokemon.map((poke) => (
                <div className="item" key={poke.id} onClick={() => correctScore(poke.id)}>
                    <img src={poke.sprites.front_default} alt="" className="pic" />
                    <p className="name">{poke.name.toUpperCase()}</p>
                </div>
            ))}
        </div>
        </>
    )
}

export default Pokemon