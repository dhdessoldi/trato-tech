import { configureStore } from '@reduxjs/toolkit';
import categoriasSlice from './reducers/categorias';
import carrinhoSlice from './reducers/carrinho';
import itensSlice from './reducers/itens';
import buscaSlice from './reducers/busca';
import usuarioSlice from './reducers/usuario';
import { listenerCategorias } from './middlewares/categorias';
import { listenerItens } from './middlewares/itens';
import createSagaMiddleware from 'redux-saga';
import { categoriasSaga } from './sagas/categorias';
import { carrinhoSaga } from './sagas/carrinho';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinhoSlice,
    busca: buscaSlice,
    usuario: usuarioSlice,
  },
  middleware:
    getDefaultMiddleware =>
      getDefaultMiddleware()
        .prepend(
          listenerCategorias.middleware,
          listenerItens.middleware,
          sagaMiddleware
        )
})

sagaMiddleware.run(categoriasSaga);
sagaMiddleware.run(carrinhoSaga);

export default store;