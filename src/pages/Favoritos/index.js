import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favoritos.css";
import { toast } from "react-toastify";

const Favoritos = () => {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
        return (
            item.id !== id // Retorna o que já está salvo, com exceção do id que foi clicado
        )
    })

    toast.success("Filme removido com sucesso")

    setFilmes(filtroFilmes)

    localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes))
  }

  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>

      {filmes.length === 0 && (
        <span>Você não tem nenhum filme salvo, volte na página inicial e salve algum filme pra assistir depois :)</span>
      )}

      <ul>
        {filmes.map((filme) => {
            return (
                <li key={filme.id}>
                    <span>{filme.title}</span>
                    <div className="favoritos-buttons">
                        <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                        <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                    </div>
                </li>
            )
        })}
      </ul>
    </div>
  );
};

export default Favoritos;
