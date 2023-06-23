import { configureStore } from '@reduxjs/toolkit';
import categoriasSlice from './reducers/categorias';
import carrinhoSlice from './reducers/carrinho';
import itensSlice from './reducers/itens';
import buscaSlice from './reducers/busca';
import { listenerCategorias } from './middlewares/categorias';
import { listenerItens } from './middlewares/itens';

const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinhoSlice,
    busca: buscaSlice,
  },
  middleware:
    getDefaultMiddleware =>
      getDefaultMiddleware()
        .prepend(
          listenerCategorias.middleware,
          listenerItens.middleware
        )
})

export default store;