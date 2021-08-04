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
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import ModalCustom from "../../../components/Modal";
import { parseCookies } from "nookies";

import { RiAddLine, RiEditLine } from "react-icons/ri";
import {
  useArrecadacaoGuias,
  ArrecadacaoGuia,
} from "../../../service/hooks/useArrecadacaoGuias";
import React, { useEffect, useState } from "react";
import ReactTable from "../../../components/ReactTable";
import { api } from "../../../service";
import { AiOutlineFilePdf, AiOutlineSearch } from "react-icons/ai";

import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@chakra-ui/react";
import { useRecolhimentos } from "../../../service/hooks/useRecolhimento";

const MotionBox = motion(Box);

export default function ArrecadacaosListagem() {
  const [loadingPDF, setLoadingPDF] = useState(false);
  const toast = useToast();
  const [arrecadacaoAtual, setArrecadacaoAtual] = useState<ArrecadacaoGuia>();
  const [tableData, setTableData] = useState([]);

  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data, error, isFetching } = useRecolhimentos();

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
      Header: "NOME",
      accessor: "cartorio.nomeResponsavel",
      width: 350,
      minWidth: 250,
    },
    {
      Header: "DOCUMENTO",
      accessor: "cartorio.cpfResponsavel",
    },
    {
      Header: "COMPETÊNCIA",
      accessor: "competencia",
      // eslint-disable-next-line react/display-name
      Cell: (props) => (
        <Badge variant="subtle" colorScheme="blue" p="1" borderRadius="6">
          {props.value}
        </Badge>
      ),
    },
    {
      Header: "VALOR",
      accessor: "valor",
      // eslint-disable-next-line react/display-name
      Cell: (props) =>
        new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL",
        }).format(props.value),
    },
    {
      Header: "SERVENTIA",
      accessor: "cartorio.nome",
    },
    {
      Header: "STATUS",
      accessor: "status_recolhimento_tsnr.nome",
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
      Header: "GERAR PDF",
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
    try {
      setLoadingPDF(true);
      const response = await api.get(
        `/gerar-relatorio-guia/${id_arrecadacao}`,
        {
          responseType: "arraybuffer",
          headers: {
            Accept: "application/pdf",
          },
        }
      );

      setLoadingPDF(false);

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${id_arrecadacao}.pdf`;
      link.click();
    } catch (error) {
      setLoadingPDF(false);

      toast({
        title: "Você não tem permissão",
        description: "Você não tem permissão para baixar o pdf desta guia",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Box>
        <Header />

        <Flex overflowX="auto" w="100%" my="6" maxWidth={1800} mx="auto" px="6">
          <Sidebar />

          <AnimatePresence>
            <MotionBox
              flex="1"
              borderRadius={8}
              bg={colorMode === "light" ? "gray.300" : "gray.800"}
              p="8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 2 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
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
                  // <Accordion allowMultiple>
                  //   {data.data.map((arrecadacao) => (
                  //     <AccordionItem key={arrecadacao.id}>
                  //       <h2>
                  //         <AccordionButton>
                  //           <Box
                  //             flex="1"
                  //             textAlign="left"
                  //             fontSize={["sm", "md"]}
                  //           >
                  //             {arrecadacao.id} - {arrecadacao.data_emissao}
                  //           </Box>
                  //           <AccordionIcon />
                  //         </AccordionButton>
                  //       </h2>
                  //       <AccordionPanel pb={4}>
                  //         <Flex flexDir={"column"}>
                  //           <Flex flexDir={"row"}>
                  //             <Text
                  //               fontSize={"xs"}
                  //               mr={"4px"}
                  //               fontWeight={"bold"}
                  //             >
                  //               CPF:
                  //             </Text>
                  //             <Text fontSize={"xs"}>
                  //               {arrecadacao.data_emissao}
                  //             </Text>
                  //           </Flex>

                  //           <Flex
                  //             flexDir={"row"}
                  //             alignItems={"center"}
                  //             mt={"10px"}
                  //           >
                  //             <Text
                  //               fontSize={"xs"}
                  //               mr={"4px"}
                  //               fontWeight={"bold"}
                  //             >
                  //               Email:
                  //             </Text>
                  //             <Text fontSize={"xs"}>
                  //               {arrecadacao.data_emissao}
                  //             </Text>
                  //           </Flex>

                  //           <Flex flexDir={"row"} mt={"10px"}>
                  //             <Text
                  //               fontSize={"xs"}
                  //               mr={"4px"}
                  //               fontWeight={"bold"}
                  //             >
                  //               Ativo:
                  //             </Text>
                  //             <Text fontSize={"xs"}>
                  //               <Badge
                  //                 variant="solid"
                  //                 colorScheme={
                  //                   arrecadacao.status_guia ? "green" : "red"
                  //                 }
                  //               >
                  //                 {arrecadacao.status_guia
                  //                   ? "Ativo"
                  //                   : "Inativo"}
                  //               </Badge>
                  //             </Text>
                  //           </Flex>

                  //           <Flex
                  //             flexDir={"row"}
                  //             mt={"10px"}
                  //             alignItems={"center"}
                  //           >
                  //             <Text
                  //               fontSize={"xs"}
                  //               mr={"4px"}
                  //               fontWeight={"bold"}
                  //             >
                  //               Ações:
                  //             </Text>
                  //             <HStack>
                  //               <Button
                  //                 as="a"
                  //                 cursor="pointer"
                  //                 size={!isWideVersion ? "sm" : "xs"}
                  //                 fontSize={!isWideVersion ? "sm" : "xs"}
                  //                 colorScheme="blue"
                  //                 mr={"4px"}
                  //               >
                  //                 <Icon as={RiEditLine} />
                  //               </Button>
                  //             </HStack>
                  //           </Flex>
                  //         </Flex>
                  //       </AccordionPanel>
                  //     </AccordionItem>
                  //   ))}
                  // </Accordion>
                  <h1>teste</h1>
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
            </MotionBox>
          </AnimatePresence>
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
                  bg={"blue.500"}
                  color={"white"}
                  _hover={{ bg: "blue.700" }}
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
