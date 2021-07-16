import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../service";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

type CreateArrecadacaoGuiaFormData = {
  nomeDevedor: string;
  cpfDevedor: string;
  descricaoSolicitacaoPagamento: string;
};

const createArrecadacaoGuiaFormSchema = yup.object().shape({
  nomeDevedor: yup.string().required("Nome é obrigatório"),
  cpfDevedor: yup.string().required("CPF é obrigatório"),
  descricaoSolicitacaoPagamento: yup
    .string()
    .required("Descrição da solicitação do pagamento é obrigatória"),
});

export default function UsuarioCreate() {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { push } = useRouter();

  const { handleSubmit, formState, register } = useForm({
    resolver: yupResolver(createArrecadacaoGuiaFormSchema),
  });

  const handleCreateArrecadacaoGuia: SubmitHandler<CreateArrecadacaoGuiaFormData> =
    async (values) => {
      const { data } = await api.post(`/emitir-guia/61/1`, {
        nomeDevedor: values.nomeDevedor,
        cpfDevedor: values.cpfDevedor,
        descricaoSolicitacaoPagamento: values.descricaoSolicitacaoPagamento,
      });

      if (data.id) {
        const response = await api.get(`/gerar-relatorio-guia/${data.id}`, {
          responseType: "arraybuffer",
          headers: {
            Accept: "application/pdf",
          },
        });

        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${data.id}.pdf`;

        toast({
          title: "Está guia ja foi gerada",
          description:
            "Já existe uma guia da mesma gerada e ela continua vigente, feche esta notificão e o pdf da guia sera baixado",
          status: "info",
          duration: 10000,
          isClosable: true,
          position: "top",
          onCloseComplete: () => link.click(),
        });

        return;
      }

      toast({
        title: "Guia criada com sucesso",
        description: "Sua arrecadacao guia foi criada.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      push("/arrecadacoes");
    };

  const { errors, isSubmitting } = formState;

  return (
    <Box>
      <Header />

      <Flex w={"100%"} my={"6"} maxW={1800} mx={"auto"} px={"6"}>
        <Sidebar />
        <AnimatePresence>
          <MotionBox
            as={"form"}
            onSubmit={handleSubmit(handleCreateArrecadacaoGuia)}
            flex={"1"}
            borderRadius={8}
            p={["6", "8"]}
            bg={colorMode === "light" ? "gray.300" : "gray.800"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Heading size={"lg"} fontWeight={"normal"}>
              Cadastro do usuário
            </Heading>

            <Divider my={"6"} borderColor={"gray.700"} />

            <VStack spacing={"4"}>
              <SimpleGrid
                minChildWidth={"240px"}
                spacing={["6", "8"]}
                w={"100%"}
              >
                <Input
                  name={"nomeDevedor"}
                  label={"Nome completo devedor"}
                  {...register("nomeDevedor")}
                  error={errors.nomeDevedor}
                  placeholder="Insira seu nome completo"
                />
                <Input
                  name={"cpfDevedor"}
                  label={"CPF do devedor"}
                  {...register("cpfDevedor")}
                  error={errors.cpfDevedor}
                  placeholder="Insira seu cpf"
                />
              </SimpleGrid>

              <SimpleGrid
                minChildWidth={"240px"}
                spacing={["6", "8"]}
                w={"100%"}
              >
                <Input
                  name={"descricaoSolicitacaoPagamento"}
                  label={"Descrição de solicitação do pagamento"}
                  {...register("descricaoSolicitacaoPagamento")}
                  error={errors.descricaoSolicitacaoPagamento}
                  placeholder="Insira sua descrição"
                />
              </SimpleGrid>
            </VStack>

            <Flex mt={"8"} justify={"flex-end"}>
              <HStack spacing={"4"}>
                <Link href={"/arrecadacoes"} passHref>
                  <Button
                    bg={"gray.500"}
                    color={"white"}
                    _hover={{ bg: "gray.700" }}
                  >
                    Cancelar
                  </Button>
                </Link>
                <Button
                  type={"submit"}
                  isLoading={isSubmitting}
                  bg={"blue.500"}
                  color={"white"}
                  _hover={{ bg: "blue.700" }}
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </MotionBox>
        </AnimatePresence>
      </Flex>
    </Box>
  );
}
