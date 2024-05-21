import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme-info.css";
import { toast } from "react-toastify";

const Filme = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  /*
    O que o useEffect está fazendo?

    *** OBS: O useEffect sempre tem que ser a primeira função a ser chamada no componente!

    - O useEffect é chamado assim que página é renderizada;
    - Ele faz um requisição GET à API passando o id do filme;
    - Depois, com o responseultado dessa requisição ele passa o responseultado
    para o setFilme. Ou seja, a partir desse momento, "filme" (que foi declarado 
    no useState como um objeto vazio) passa a receber TODO O responseULTADO DA 
    REQUISIÇÃO, e com isso podemos fazer inúmeras coisas com "filme";
    - Porém, devemos passar um catch, em caso do filme não ter sido encontrado. Usando
    o useNavigate podemos redirecionar o usuário para alguma tela, e nesse caso, para
    a tela de Home (por isso foi passado o paràmetro "/"). E foi passado mais um 
    parâmetro, o "replace: true", para dar um replace na Url do usuário. E foi dado
    um return para finalizar a execução do código.

    - Foi dado um setLoading(false) para encerrar a tela que
    fica carregando enquanto a requisição não é retornada.
    - Após isso, deve ser chamada a função!

    - Abaixo, há uma verificação de loading para caso esteja
    carregando a tela enquanto não retorna a requisição da API.
    - Para não ficar em branco, foi criado apenas uma div para
    mostrar uma frase de "Carregando detalhes..."

    - Após essas definições de informações acima, é dado o return
    para renderizar as informações na tela, utilizando "filme", que
    possui todas as informações da requisição!
*/

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "823454608f87c2c263c18e421d4af8d3",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", {replace: true});
          return
        });
    }

    loadFilme();

    return () => {
      console.log("componente desmontado");
    }
  }, []);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix")

    let filmesSalvos = JSON.parse(minhaLista) || [] // pegar do Local Storage, ou inicializar com array vazio

    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

    if (hasFilme) {
      toast.warn("ESSE FILME JÁ ESTÁ SALVO NA SUA LISTA!")
      return
    }
    filmesSalvos.push(filme)
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
    toast.success("Filme salvo com sucesso")
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} /10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
      </div>
    </div>
  );
};

export default Filme;
