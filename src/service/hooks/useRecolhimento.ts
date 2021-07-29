import { useQuery } from "react-query";
import { api } from "../index";

interface Cartorio {
  id: number;
  nome: string;
  cnpj: string;
  cns: number;
}

interface Recolhimento {
  id: number;
  status_recolhimento: string;
  valor: number;
  competencia: string;
  fk_cartorio: number;
  cartorio: Cartorio;
}

interface getRecolhimentoResponse {
  data: Recolhimento[];
}

// requisição á api (fetch)
async function getRecolhimentos(): Promise<getRecolhimentoResponse> {
  const { data } = await api.get(`/tsnr/recolhimentos`);

  return {
    data,
  };
}

// conectando o fetch a api com o react query
export function useRecolhimentos() {
  return useQuery("recolhimentos", () => getRecolhimentos(), {
    staleTime: 1000 * 60 * 10, // de 10 em 10 minutos os recolhimentos iram atualizar
  });
}
