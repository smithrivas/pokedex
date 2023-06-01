import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PokemonId = () => {
  const navigate = useNavigate();

  const toReturn = () => {
    navigate("/pokedex");
  };

  const { id } = useParams();
  const [pokemonId, setPokemonId] = useState();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setPokemonId(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <section className="poke-id">
      <aside className="poke-head">
        <div className={`${pokemonId?.types[0].type.name} border`}>
          <img
            className="pokemon-img-id"
            src={pokemonId?.sprites.other["official-artwork"].front_default}
            alt="pokemon"
          />
          <h1 className="poke-id-text">#{pokemonId?.id} </h1>
          <h2 className="poke-id-text">{pokemonId?.name} </h2>
        </div>
        <div className="poke-info-id">
          <p>Weigth </p>
          <p>Heigth</p>
          <span className="info_id">{pokemonId?.weight} </span>
          <span className="info_id">{pokemonId?.height} </span>
        </div>
        <div className="poke-type-ability">
          <h2>Type</h2>
          <h2>Abilities</h2>
          <p className="title__info blue">{pokemonId?.types[0].type.name}</p>
          <p className="title__info purple">{`${
            pokemonId?.types[1]?.type?.name === undefined
              ? "-○-"
              : pokemonId?.types[1].type.name
          }`}</p>
          <p className="title__info">{pokemonId?.abilities[0].ability.name}</p>
          <p className="title__info">{pokemonId?.abilities[1].ability.name}</p>
        </div>
        <div className="stats">
          <h2>Stats</h2>
          <div className="head">
            <p className="info_id">{pokemonId?.stats[0].stat.name}</p>
            <p>{pokemonId?.stats[0].base_stat} /150</p>
          </div>
          <div
            className={`info__var end--${pokemonId?.stats[0].base_stat}`}
          ></div>
          <div className="head">
            <p className="info_id">{pokemonId?.stats[1].stat.name}</p>
            <p>{pokemonId?.stats[1].base_stat} /150</p>
          </div>
          <div
            className={`info__var end--${pokemonId?.stats[1].base_stat}`}
          ></div>
          <div className="head">
            <p className="info_id">{pokemonId?.stats[2].stat.name}</p>
            <p>{pokemonId?.stats[2].base_stat} /150</p>
          </div>
          <div
            className={`info__var end--${pokemonId?.stats[2].base_stat}`}
          ></div>
          <div className="head">
            <p className="info_id">{pokemonId?.stats[5].stat.name}</p>
            <p>{pokemonId?.stats[5].base_stat}/150</p>
          </div>
          <div
            className={`info__var end--${pokemonId?.stats[5].base_stat}`}
          ></div>
        </div>
      </aside>
      <aside className="movements">
        <h2 className="movements-title">Movements</h2>
        <div className="info">
          {pokemonId?.moves.map((e) => (
            <button key={e.move.url} className="btn-info">
              {e.move.name}
            </button>
          ))}
        </div>
      </aside>
      <button className="btn btn-return" onClick={toReturn}>
        ← Return
      </button>
    </section>
  );
};

export default PokemonId;
