import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Pokemon = ({url}) => {
  
    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data))
            .catch(err => console.log(err))
    },[])

    const navigate = useNavigate()
    const clinkPokemon = () => {
        navigate(`/pokemon/${pokemon?.id}`)
    }
  return (
    <section onClick={clinkPokemon} className={`${pokemon?.types[0].type.name} pokemon`}>
        <img className='pokemon-img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon" />
        <h2 className='pokemon-name'>{pokemon?.name} </h2>
        <p className='pokemon-type'>{`${pokemon?.types[0].type.name} / ${pokemon?.types[1]?.type?.name === undefined ? '-○-' : pokemon?.types[1]?.type?.name}`} </p>
        <p className='pokemon-type'>Type</p>
        <div className='pokemon-mov'>
        <aside>
          <p className='pokemon-state'> {pokemon?.stats[0].stat.name}</p>
          <h2 className='pokemon-base-state'> {pokemon?.stats[0].base_stat}</h2>
        </aside>
        <aside>
          <p className='pokemon-state'> {pokemon?.stats[1].stat.name}</p>
          <h2 className='pokemon-base-state'> {pokemon?.stats[1].base_stat}</h2>
        </aside>
        <aside>
          <p className='pokemon-state'> {pokemon?.stats[2].stat.name}</p>
          <h2 className='pokemon-base-state'> {pokemon?.stats[2].base_stat}</h2>
        </aside>
        <aside>
          <p className='pokemon-state'> {pokemon?.stats[5].stat.name}</p>
          <h2 className='pokemon-base-state'> {pokemon?.stats[5].base_stat}</h2>
        </aside>
        </div>
    </section>
  )
}

export default Pokemon