import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type CreateUserFormData = {
  nome: string;
  cpf: string;
  senha: string;
  confirmacao_senha: string;
};

const createUserFormSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  senha: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "No minímo 6 caracteres"),
  confirmacao_senha: yup
    .string()
    .oneOf([null, yup.ref("senha")], "As senhas precisam ser iguais"),
});

export default function UsuarioCreate() {
  const { colorMode } = useColorMode();

  const { handleSubmit, formState, register } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(values);
  };

  const { errors, isSubmitting } = formState;

  return (
    <Box>
      <Header />

      <Flex w={"100%"} my={"6"} maxW={1800} mx={"auto"} px={"6"}>
        <Sidebar />

        <Box
          as={"form"}
          onSubmit={handleSubmit(handleCreateUser)}
          flex={"1"}
          borderRadius={8}
          p={["6", "8"]}
          bg={colorMode === "light" ? "gray.300" : "gray.800"}
        >
          <Heading size={"lg"} fontWeight={"normal"}>
            Cadastro do usuário
          </Heading>

          <Divider my={"6"} borderColor={"gray.700"} />

          <VStack spacing={"4"}>
            <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w={"100%"}>
              <Input
                name={"nome"}
                label={"Nome completo"}
                {...register("nome")}
                error={errors.nome}
                placeholder="Insira seu nome completo"
              />
              <Input
                name={"cpf"}
                label={"CPF"}
                {...register("cpf")}
                error={errors.cpf}
                placeholder="Insira seu cpf"
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w={"100%"}>
              <Input
                name={"senha"}
                type={"password"}
                label={"Senha"}
                {...register("senha")}
                error={errors.senha}
                placeholder="Insira sua senha"
              />
              <Input
                name={"confirmacao_senha"}
                type={"password"}
                label={"Confirmação da senha"}
                {...register("confirmacao_senha")}
                error={errors.confirmacao_senha}
                placeholder="Confirme sua senha"
              />
            </SimpleGrid>
          </VStack>

          <Flex mt={"8"} justify={"flex-end"}>
            <HStack spacing={"4"}>
              <Link href={"/usuarios"} passHref>
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
        </Box>
      </Flex>
    </Box>
  );
}
