import Header from 'components/Header';
import styles from './Carrinho.module.scss';
import { useSelector } from 'react-redux';
import Item from 'components/Item';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';

export default function Carrinho() {
  const navigate = useNavigate();

  const { carrinho, total } = useSelector(state => {
    const regexp = new RegExp(state.busca, 'i')
    const carrinhoReduce = state.carrinho.data.reduce((itens, itemNoCarrinho) => {
      const item = state.itens.find(item => item.id === itemNoCarrinho.id);
      if (item.titulo.match(regexp)) {
        itens.push({
          ...item,
          quantidade: itemNoCarrinho.quantidade,
        });
      }
      return itens
    }, []);
    return {
      carrinho: carrinhoReduce,
      total: state.carrinho.total,
    };
  })
  return (
    <div>
      <Header
        titulo='Carrinho de compras'
        descricao='Confira os produros que você adicionou ao carrinho'
      />
      <div className={styles.carrinho}>
        {carrinho.map(item => <Item carrinho key={item.id} {...item} />)}
        <div className={styles.total}>
          <strong>Resumo da compra</strong>
          <span>Subtotal: <strong>R$ {total.toFixed(2).replace('.', ',')}</strong></span>
        </div>
        <Button type='button' onClick={() => navigate('/pagamento')}>
          Finalizar Compra
        </Button>
      </div>
    </div>
  )
}
