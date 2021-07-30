import { useQuery } from "react-query";
import { api } from "../index";

interface Cartorio {
  id: number;
  nome: string;
  cnpj: string;
  cns: number;
}

interface Perfil {
  id: number;
  nome: string;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  ativo: boolean;
  cartorio: Cartorio;
  perfis: Perfil[]
}

interface getUsuarioResponse {
  data: Usuario[];
}

// requisição á api (fetch)
async function getUsuarios(page?: number): Promise<getUsuarioResponse> {
  const { data } = await api.get(`/usuarios`);

  return {
    data,
  };
}

// conectando o fetch a api com o react query
export function useUsuarios(page?: number) {
  return useQuery("usuarios", () => getUsuarios(), {
    staleTime: 1000 * 60 * 10, //10 minutos q os dados vao ficar sem atualizar
  });
}
