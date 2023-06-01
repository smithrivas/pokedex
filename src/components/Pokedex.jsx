import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pokemon from "./Pokemon";
import { useDispatch } from "react-redux";
import { setTypeSelected } from "../store/slices/typeQuery.slice";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { useForm } from "react-hook-form";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState();
  // pagination

  const [currentPage, setCurrentPage] = useState(1);
  let arrayPokemons = [];
  const pokemonPerPage = 16;
  if (pokemons?.length < pokemonPerPage) {
    arrayPokemons = [...pokemons];
  } else {
    const lastPokemon = currentPage * pokemonPerPage;
    arrayPokemons = pokemons?.slice(lastPokemon - pokemonPerPage, lastPokemon);
  }

  let arrayPages = [];
  let quantityPages = Math.ceil(pokemons?.length / pokemonPerPage);
  const pagesPerBlock = 5;
  let currentBlock = Math.ceil(currentPage / pagesPerBlock);
  if (currentBlock * pagesPerBlock > quantityPages) {
    for (
      let i = currentBlock * pagesPerBlock - pagesPerBlock + 1;
      i <= quantityPages;
      i++
    ) {
      arrayPages.push(i);
    }
  } else {
    for (
      let i = currentBlock * pagesPerBlock - pagesPerBlock + 1;
      i <= currentBlock * pagesPerBlock;
      i++
    ) {
      arrayPages.push(i);
    }
  }

  const [types, settypes] = useState();

  const typeSelected = useSelector((state) => state.typeSelected);
  const dispath = useDispatch();

  useEffect(() => {
    if (typeSelected === "ALLPOKEMON") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100")
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`https://pokeapi.co/api/v2/type/${typeSelected}`)
        .then((res) => {
          const array = res.data.pokemon.map((e) => e.pokemon);
          setPokemons(array);
        })
        .catch((err) => console.log(err));
    }

    axios
      .get("https://pokeapi.co/api/v2/type/")
      .then((res) => settypes(res.data.results))
      .catch((err) => console.log(err));
  }, [typeSelected]);

  const nameUser = useSelector((state) => state.nameUser);

  const navigate = useNavigate();

  if (nameUser.trim() === "") {
    navigate("/");
  }

  const selectOption = (e) => {
    dispath(setTypeSelected(e.target.value));
  };

  const [searchElement, setSearchElement] = useState();
  const valueSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filter = pokemons.filter((element) => element.name.includes(value));
    setSearchElement(filter);
  };

  return (
    <div>
      <h2 className="pokedex-title">
        <span className="pokedex-name">Welcome {nameUser}</span>, Here you can
        find all the pokemons
      </h2>
      <aside className="pokedex-nav">
        <form className="home-form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="home-input home-input__search"
            type="text"
            placeholder="Search for a pokemon"
            onChange={valueSearch}
          />
          <button className="btn">
            <i className="bx bx-search"></i>
          </button>
        </form>
        <select className="pokedex-select" onChange={selectOption} name="class">
          <option value="ALLPOKEMON">All pokemons</option>
          {types?.map((optionType) => (
            <option key={optionType.url} value={optionType.name}>
              {optionType.name}
            </option>
          ))}
        </select>
      </aside>
      {
        <Pagination
          arrayPages={arrayPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          quantityPages={quantityPages}
        />
      }
      <section className={`pokemons-card`}>
        {searchElement
          ? searchElement?.map((pokemon) => (
              <Pokemon url={pokemon.url} key={pokemon?.url} />
            ))
          : arrayPokemons?.map((pokemon) => (
              <Pokemon url={pokemon.url} key={pokemon?.url} />
            ))}
      </section>
    </div>
  );
};

export default Pokedex;
