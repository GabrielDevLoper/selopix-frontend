import { useQuery } from "react-query";
import { api } from "../index";

export interface ArrecadacaoGuia {
  id: number;
  data_emissao: Date;
  data_vencimento: Date;
  status_guia: boolean;
  valor: number;
  nome_devedor: string;
  cpf_devedor: string;
  status_pagamento: string;
  pixQrcode: {
    txid_conciliacao_solicitante: string;
    valor_original: number;
    qrcode: string;
    link_qrcode: string;
    estado_solicitacao: string;
    data_pagamento: Date;
    codigo_pagamento: number;
    valor_pagamento: number;
    cpf_pagador: string;
    cnpj_pagador: string;
    nome_cliente_pagador: string;
    texto_informativo_pagador: string;
  };
  arrecadacao: {
    id: number;
    competencia: string;
  };
  cartorio: {
    id: number;
    nome: string;
    cnpj: string;
    cns: number;
  };
}

export interface getArrecadacaoGuiaResponse {
  data: ArrecadacaoGuia[];
}

// requisição á api (fetch)
async function getArrecadacoesGuias(): Promise<getArrecadacaoGuiaResponse> {
  const { data } = await api.get(`/arrecadacoes-guias/listar`);

  return {
    data,
  };
}

// conectando o fetch a api com o react query
export function useArrecadacaoGuias() {
  return useQuery("arrecadacoes", () => getArrecadacoesGuias(), {
    staleTime: 5000,
  });
}
