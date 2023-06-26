import { call, cancel, take } from "redux-saga/effects";
import { categoriasSaga, observarCategorias } from "./categorias"
import categoriasService from "services/categorias";
import { adicionarTodasCategorias } from "store/reducers/categorias";
import { createMockTask } from "@redux-saga/testing-utils";

describe('Testando categorias Saga', () => {
  describe('workers', () => {
    test('Deve executar categoriasService.buscar', () => {
      const funcaoGeradora = observarCategorias();
      const funcaoEsperada = call(categoriasService.buscar)
      funcaoGeradora.next(); //delay
      const funcaoExecutada = funcaoGeradora.next();
      expect(funcaoExecutada.value).toEqual(funcaoEsperada);
    })
  })
  describe('watchers', () => {
    test('Deve executar a tarefa corretamente', () => {
      const funcaoGeradora = categoriasSaga();
      funcaoGeradora.next();
      const funcaoEsperada = take(adicionarTodasCategorias);

      expect(funcaoGeradora.next().value).toEqual(funcaoEsperada)
    });
    test('deve excutar a tarefa apenas uma vez', () => {

      const funcaoGeradora = categoriasSaga();
      const mockTarefa = createMockTask();
      funcaoGeradora.next(mockTarefa);
      const funcaoCancelarEsperada = cancel(mockTarefa.cancel());
      funcaoGeradora.next()

      expect(funcaoGeradora.next().value).toEqual(funcaoCancelarEsperada)
    })
  })
})