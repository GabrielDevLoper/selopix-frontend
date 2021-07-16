import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Text,
  HStack,
  VStack,
  Accordion,
  useColorMode,
  useBreakpointValue,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
  Badge,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { RiAddLine, RiEditLine } from "react-icons/ri";

import {
  useArrecadacaoGuias,
  ArrecadacaoGuia,
} from "../../service/hooks/useArrecadacaoGuias";
import React, { useEffect, useMemo, useState } from "react";
import ReactTable from "../../components/ReactTable";
import { api } from "../../service";
import { AiOutlineFilePdf, AiOutlineSearch } from "react-icons/ai";
import { Input } from "../../components/Form/Input";
import { SimpleGrid } from "@chakra-ui/react";

export default function ArrecadacaosListagem() {
  const [page, setPage] = useState(1);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [arrecadacaoAtual, setArrecadacaoAtual] = useState<ArrecadacaoGuia>();
  const [tableData, setTableData] = useState([]);

  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data, error, isFetching } = useArrecadacaoGuias(page);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      // eslint-disable-next-line react/display-name
      Cell: (props) => (
        <Box onClick={onOpen}>
          <Link
            color="blue.500"
            onClick={() => setArrecadacaoAtual(props.row.original)}
          >
            <Text fontSize="sm" fontWeight="bold">
              {props.value}
            </Text>
          </Link>
        </Box>
      ),
    },
    {
      Header: "DATA EMISSÃO",
      accessor: "data_emissao",
    },
    {
      Header: "DATA VENCIMENTO",
      accessor: "data_vencimento",
    },
    {
      Header: "VALOR",
      accessor: "valor",
    },
    {
      Header: "COMPETÊNCIA",
      accessor: "arrecadacao.competencia",
    },
    {
      Header: "SERVENTIA",
      accessor: "cartorio.nome",
    },
    {
      Header: "STATUS PAGAMENTO",
      accessor: "status_pagamento",

      // eslint-disable-next-line react/display-name
      Cell: (props) => (
        <Badge
          variant="subtle"
          colorScheme={
            props.value === "PAGAMENTO PENDENTE" ? "yellow" : "green"
          }
          p="1"
          borderRadius="6"
        >
          {props.value}
        </Badge>
      ),
    },
    {
      Header: "STATUS GUIA",
      accessor: "status_guia",
      // eslint-disable-next-line react/display-name
      Cell: (props) => (
        <Badge
          variant="subtle"
          colorScheme={props.value ? "green" : "red"}
          p="1"
          borderRadius="6"
        >
          {props.value ? "Ativo" : "Inativo"}
        </Badge>
      ),
    },
  ];

  useEffect(() => {
    setTableData(data?.data);
  }, [data]);

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  });

  async function handleGetPdfGuia(id_arrecadacao: number) {
    setLoadingPDF(true);
    const response = await api.get(`/gerar-relatorio-guia/${id_arrecadacao}`, {
      responseType: "arraybuffer",
      headers: {
        Accept: "application/pdf",
      },
    });
    setLoadingPDF(false);

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${id_arrecadacao}.pdf`;
    link.click();
  }

  return (
    <>
      <Box>
        <Header />

        <Flex overflowX="auto" w="100%" my="6" maxWidth={1800} mx="auto" px="6">
          <Sidebar />

          <Flex
            w="100%"
            my="6"
            maxWidth={1800}
            mx="auto"
            px="6"
            flexDir="column"
          >
            <Box
              flex="1"
              borderRadius={8}
              bg={colorMode === "light" ? "gray.300" : "gray.800"}
              p="8"
            >
              <Flex
                mb="8"
                justifyContent="space-between"
                flexDir={isWideVersion ? "column" : "row"}
                alignItems="center"
              >
                <Heading size={"md"} fontWeight="normal">
                  Listagem de arrecadações guias
                  {!isLoading && isFetching && (
                    <Spinner size="md" color="gray.500" ml="4" />
                  )}
                </Heading>
                <NextLink href="/arrecadacoes/create" passHref>
                  <Button
                    as="a"
                    cursor="pointer"
                    size={isWideVersion ? "sm" : "md"}
                    fontSize="md"
                    bg={"blue.500"}
                    color={"white"}
                    _hover={{ bg: "blue.700" }}
                    mt={isWideVersion ? "20px" : "0"}
                    leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                  >
                    {/* <Icon as={RiAddLine} fontSize="20" /> */}
                    Emitir Guia
                  </Button>
                </NextLink>
              </Flex>

              {isWideVersion ? (
                isLoading || !tableData ? (
                  <Flex justify={"center"}>
                    <Spinner />
                  </Flex>
                ) : error ? (
                  <Flex justify={"center"}>
                    <Text>Falha ao obter os dados dos arrecadacos</Text>
                  </Flex>
                ) : (
                  <Accordion allowMultiple>
                    {data.data.map((arrecadacao) => (
                      <AccordionItem key={arrecadacao.id}>
                        <h2>
                          <AccordionButton>
                            <Box
                              flex="1"
                              textAlign="left"
                              fontSize={["sm", "md"]}
                            >
                              {arrecadacao.id} - {arrecadacao.data_emissao}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <Flex flexDir={"column"}>
                            <Flex flexDir={"row"}>
                              <Text
                                fontSize={"xs"}
                                mr={"4px"}
                                fontWeight={"bold"}
                              >
                                CPF:
                              </Text>
                              <Text fontSize={"xs"}>
                                {arrecadacao.data_emissao}
                              </Text>
                            </Flex>

                            <Flex
                              flexDir={"row"}
                              alignItems={"center"}
                              mt={"10px"}
                            >
                              <Text
                                fontSize={"xs"}
                                mr={"4px"}
                                fontWeight={"bold"}
                              >
                                Email:
                              </Text>
                              <Text fontSize={"xs"}>
                                {arrecadacao.data_emissao}
                              </Text>
                            </Flex>

                            <Flex flexDir={"row"} mt={"10px"}>
                              <Text
                                fontSize={"xs"}
                                mr={"4px"}
                                fontWeight={"bold"}
                              >
                                Ativo:
                              </Text>
                              <Text fontSize={"xs"}>
                                <Badge
                                  variant="solid"
                                  colorScheme={
                                    arrecadacao.status_guia ? "green" : "red"
                                  }
                                >
                                  {arrecadacao.status_guia
                                    ? "Ativo"
                                    : "Inativo"}
                                </Badge>
                              </Text>
                            </Flex>

                            <Flex
                              flexDir={"row"}
                              mt={"10px"}
                              alignItems={"center"}
                            >
                              <Text
                                fontSize={"xs"}
                                mr={"4px"}
                                fontWeight={"bold"}
                              >
                                Ações:
                              </Text>
                              <HStack>
                                <Button
                                  as="a"
                                  cursor="pointer"
                                  size={!isWideVersion ? "sm" : "xs"}
                                  fontSize={!isWideVersion ? "sm" : "xs"}
                                  colorScheme="blue"
                                  mr={"4px"}
                                >
                                  <Icon as={RiEditLine} />
                                </Button>
                              </HStack>
                            </Flex>
                          </Flex>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )
              ) : isLoading || !tableData ? (
                <Flex justify={"center"}>
                  <Spinner />
                </Flex>
              ) : error ? (
                <Flex justify={"center"}>
                  <Text>Falha ao obter os dados dos arrecadacaos</Text>
                </Flex>
              ) : (
                <ReactTable columnsHeader={columns} data={tableData} />
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="xl"
      >
        <ModalOverlay bg="rgba(0, 0, 0, 0.2)" />
        <ModalContent>
          <ModalHeader>Detalhes da guia</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"}>
              <Flex flexDir={"column"}>
                <Text>Nome devedor: {arrecadacaoAtual?.nome_devedor}</Text>
                <Text>CPF devedor: {arrecadacaoAtual?.cpf_devedor}</Text>
                <Text>
                  Competência: {arrecadacaoAtual?.arrecadacao?.competencia}
                </Text>
                <Text>Cartório: {arrecadacaoAtual?.cartorio?.nome}</Text>
              </Flex>
              <Flex justifyContent="center" alignItems="center" mt="20px">
                <Button
                  leftIcon={<AiOutlineFilePdf />}
                  colorScheme="blue"
                  variant="solid"
                  onClick={() => handleGetPdfGuia(arrecadacaoAtual?.id)}
                  isLoading={loadingPDF}
                >
                  Gerar PDF
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
