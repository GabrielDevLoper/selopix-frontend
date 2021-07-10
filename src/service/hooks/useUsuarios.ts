import { useQuery } from "react-query";
import { api } from "../index";

interface Cartorio {
  id: number;
  nome: string;
  cnpj: string;
  cns: number;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  ativo: boolean;
  cartorio: Cartorio;
}

interface getUsuarioResponse {
  totalUsuarios: number;
  data: Usuario[];
}

// requisição á api (fetch)
async function getUsuarios(page: number): Promise<getUsuarioResponse> {
  const { data } = await api.get(`/usuarios?pagina=${page}`);

  console.log(data[0]);
  return {
    totalUsuarios: 466,
    data,
  };
}

// conectando o fetch a api com o react query
export function useUsuarios(page: number) {
  return useQuery(["usuarios", page], () => getUsuarios(page), {
    staleTime: 1000 * 60 * 10, //10 minutos q os dados vao ficar sem atualizar
  });
}
