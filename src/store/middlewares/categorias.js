import { createListenerMiddleware } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";
import { adicionarTodasCategorias, adicionarUmaCategoria, carregarCategorias, carregarUmaCategoria } from "store/reducers/categorias";
import criarTarefa from "./utils/criarTarefa";

export const listenerCategorias = createListenerMiddleware();

listenerCategorias.startListening({
  actionCreator: carregarCategorias,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    const resposta = await criarTarefa({
      dispatch,
      fork,
      action: adicionarTodasCategorias,
      busca: categoriasService.buscar,
      textoCarregando: 'Carregando categorias',
      textoSucesso: 'Categorias carregadas com sucesso',
      textoErro: 'Erro na busca de categorias',
    });
    if (resposta.status === 'ok') {
      unsubscribe();
    }
  }
});

listenerCategorias.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { dispatch, fork, getState, unsubscribe }) => {
    const { categorias } = getState()
    const nomeCategoria = action.payload;
    const categoriaCarregada = categorias.some(categoria => categoria.id === nomeCategoria)

    if (categoriaCarregada) return;
    if (categorias.length === 5) return unsubscribe();

    await criarTarefa({
      dispatch,
      fork,
      action: adicionarUmaCategoria,
      busca: () => categoriasService.buscarUmaCategoria(nomeCategoria),
      textoCarregando: `Carregando categoria ${nomeCategoria}`,
      textoSucesso: `Categoria ${nomeCategoria} carregada com sucesso`,
      textoErro: `Erro na busca da categoria ${nomeCategoria}`,
    });
  }
})