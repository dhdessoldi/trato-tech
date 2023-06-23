import { createListenerMiddleware } from "@reduxjs/toolkit";
import { carregarUmaCategoria } from "store/reducers/categorias";
import criarTarefa from "./utils/criarTarefa";
import itensService from "services/itens";
import { adicionarItens } from "store/reducers/itens";

export const listenerItens = createListenerMiddleware();

listenerItens.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { dispatch, fork, unsubscribe, getState }) => {
    const { itens } = getState();

    if (itens.length === 25) return unsubscribe();

    const nomeCategoria = action.payload;

    const itensCarregados = itens.some(item => item.categoria === nomeCategoria);

    if (itensCarregados) return;

    await criarTarefa({
      dispatch,
      fork,
      action: adicionarItens,
      busca: () => itensService.buscarDeCategorias(nomeCategoria),
      textoCarregando: `Carregando itens da categoria ${nomeCategoria}`,
      textoSucesso: `Itens da categoria ${nomeCategoria} carregados com sucesso`,
      textoErro: 'Erro na busca de itens',
    });
  }
});