import { useQuery } from "react-query";
import { api } from "../index";

interface ArrecadacaoGuia {
  id: number;
  data_emissao: Date;
  data_vencimento: Date;
  status_guia: boolean;
  valor: number;
  nome_devedor: string;
  cpf_devedor: string;
  arrecadacao: {
    id: number;
    competencia: string;
    cartorio: {
      id: number;
      nome: string;
      cnpj: string;
      cns: number;
    };
  };
}

interface getArrecadacaoGuiaResponse {
  totalArrecadacoesGuias: number;
  data: ArrecadacaoGuia[];
}

// requisição á api (fetch)
async function getArrecadacoesGuias(
  page: number
): Promise<getArrecadacaoGuiaResponse> {
  const { data } = await api.get(`/arrecadacoes-guias/listar`);

  return {
    totalArrecadacoesGuias: 466,
    data,
  };
}

// conectando o fetch a api com o react query
export function useArrecadacaoGuias(page: number) {
  return useQuery(["arrecadacoes", page], () => getArrecadacoesGuias(page), {
    staleTime: 5000,
  });
}
