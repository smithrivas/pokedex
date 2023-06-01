import React from "react";
import { useForm } from "react-hook-form";
import { setNameUser } from "../../store/slices/nameUser.slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import pokedeximg from "../../assets/pokedex.png";

const Home = () => {
  const { handleSubmit, register } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const submit = (data) => {
    dispatch(setNameUser(data.nameUser));
    navigate("/pokedex");
  };

  return (
    <section className="home">
      <aside className="home-info">
        <img className="home-img" src={pokedeximg} alt="pokedex" />
        <h2 className="home-title">Hi Coach!</h2>
        <p className="home-p">Please enter your name</p>
        <form className="home-form" onSubmit={handleSubmit(submit)}>
          <input
            className="home-input"
            type="text"
            required
            placeholder="Your name"
            {...register("nameUser")}
          />
          <button className="btn">let's Go</button>
        </form>
      </aside>
    </section>
  );
};

export default Home;
