import Anuncie from "Pages/Anuncie";
import Carrinho from "Pages/Carrinho";
import Categoria from "Pages/Categoria";
import Home from "Pages/Home";
import Pagamento from "Pages/Pagamento";
import PaginaPadrao from "components/PaginaPadrao";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const rotaAnuncie = 'anuncie';
export const rotaCategoria = 'categoria';


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPadrao />}>
          <Route index element={<Home />} />
          <Route path={`/${rotaCategoria}/:nomeCategoria`} element={<Categoria />} />
          <Route path='carrinho' element={<Carrinho />} />
          <Route path='anuncie/:nomeCategoria' element={<Anuncie />} />
          <Route path={rotaAnuncie} element={<Anuncie />} />
          <Route path='pagamento' element={<Pagamento />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
