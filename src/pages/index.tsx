import { Flex, Button, VStack, Text, Box } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Logo from "../components/Header/Logo";
import { useRouter } from "next/router";
import { useColorMode } from "@chakra-ui/react";

type SignInFormData = {
  cpf: string;
  senha: string;
};

const signInFormSchema = yup.object().shape({
  cpf: yup.string().required("CPF é obrigatório"),
  senha: yup.string().required("Senha é obrigatória"),
});

export default function Login() {
  const { colorMode } = useColorMode();

  const { push } = useRouter();

  const { handleSubmit, formState, register } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);

    await push("/dashboard");
  };

  const { errors, isSubmitting } = formState;

  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir={"column"}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        mb={"10"}
        flexDir="column"
      >
        <Logo fontSize={"60px"} />

        <Text fontWeight="bold" fontSize={"20px"} letterSpacing="tight">
          Acessar o sistema
        </Text>
      </Flex>
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg={colorMode === "light" ? "gray.300" : "gray.800"}
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <VStack>
          <Input
            name="cpf"
            label="CPF"
            type="text"
            error={errors.cpf}
            placeholder="Insira seu cpf"
            {...register("cpf")}
          />
          <Input
            name="senha"
            label="Senha"
            type="password"
            error={errors.senha}
            placeholder="Insira sua senha"
            {...register("senha")}
          />
        </VStack>
        <Button
          type="submit"
          mt="6"
          colorScheme="blue"
          size="lg"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
