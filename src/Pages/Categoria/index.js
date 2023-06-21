import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from './Categoria.module.scss'
import Item from "components/Item";
import Button from "components/Button";
import { useEffect } from "react";
import { buscarItens } from "store/reducers/itens";
import { buscarCategorias } from "store/reducers/categorias";

export default function Categoria() {

  const dispatch = useDispatch();
  const { nomeCategoria } = useParams();
  const navigate = useNavigate();

  const { categoria, itens } = useSelector(state => {
    const regexp = new RegExp(state.busca, 'i')
    return {
      categoria: state.categorias.find(categoria => categoria.id === nomeCategoria),
      itens: state.itens.filter(item => item.categoria === nomeCategoria && item.titulo.match(regexp))

    }
  })

  useEffect(() => {
    dispatch(buscarCategorias())
    dispatch(buscarItens())
  }, [dispatch])


  return (
    <div>
      <Header
        titulo={categoria.nome}
        descricao={categoria.descricao}
        imagem={categoria.header}
      >
        <Button onClick={() => navigate(`/anuncie/${nomeCategoria}`)}>Quero anunciar!</Button>
      </Header>
      <div className={styles.itens}>
        {itens?.map(item => (
          <Item key={item.id} {...item}></Item>
        ))}
      </div>
    </div>
  )
}
