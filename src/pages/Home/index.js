// src/pages/Home/Home.js
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "./home.css";

const Home = () => {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "823454608f87c2c263c18e421d4af8d3",
          language: "pt-BR",
          page: 1,
        },
      });

      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
      console.log(response);
    }
    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`} className="acessar-link">Acessar</Link>
            </article>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
