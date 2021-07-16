import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
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
import { Pagination } from "../../components/Pagination";
import { useUsuarios } from "../../service/hooks/useUsuarios";
import React, { useEffect, useState } from "react";
import { queryClient } from "../../service/queryClient";
import { api } from "../../service";
import ReactTable from "../../components/ReactTable";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  ativo: boolean;
  cartorio: {
    id: number;
    nome: string;
    cnpj: string;
    cns: number;
  };
}

export default function UsuariosListagem() {
  const [page, setPage] = useState(1);
  const [usuarioAtual, setUsuarioAtual] = useState<Usuario>();
  const [tableData, setTableData] = useState([]);

  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data, error, isFetching } = useUsuarios();

  useEffect(() => {
    setTableData(data?.data);
  }, [data]);

  const columns = [
    // {
    //   Header: "ID",
    //   accessor: "id",
    //   // eslint-disable-next-line react/display-name
    //   Cell: (props) => (
    //     <Box onClick={onOpen}>
    //       <Link
    //         color="blue.500"
    //         onClick={() => setArrecadacaoAtual(props.row.original)}
    //       >
    //         <Text fontSize="sm" fontWeight="bold">
    //           {props.value}
    //         </Text>
    //       </Link>
    //     </Box>
    //   ),
    // },
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "NOME",
      accessor: "nome",
    },
    {
      Header: "CPF",
      accessor: "cpf",
    },
    {
      Header: "CARTÓRIO",
      accessor: "cartorio.nome",
    },
    {
      Header: "CNS",
      accessor: "cns",
    },

    {
      Header: "STATUS",
      accessor: "ativo",
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

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  });

  async function handlePrefetchUser(id_usuario: number) {
    await queryClient.prefetchQuery(
      ["usuarios", id_usuario],
      async () => {
        const response = await api.get(`/usuarios/${id_usuario}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10,
      }
    );
  }

  return (
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
            <Flex mb="8" justifyContent="space-between" alignItems="center">
              <Heading size={"md"} fontWeight="normal">
                Listagem de usuários
                {!isLoading && isFetching && (
                  <Spinner size="md" color="gray.500" ml="4" />
                )}
              </Heading>
              <NextLink href="/usuarios/create" passHref>
                <Button
                  as="a"
                  cursor="pointer"
                  size="md"
                  fontSize="md"
                  bg={"blue.500"}
                  color={"white"}
                  _hover={{ bg: "blue.700" }}
                  mt={isWideVersion ? "20px" : "0"}
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  {/* <Icon as={RiAddLine} fontSize="20" /> */}
                  Criar novo
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
                  <Text>Falha ao obter os dados dos usuarios</Text>
                </Flex>
              ) : (
                <Accordion allowMultiple>
                  {data.data.map((usuario) => (
                    <AccordionItem key={usuario.id}>
                      <h2>
                        <AccordionButton>
                          <Box
                            flex="1"
                            textAlign="left"
                            fontSize={["sm", "md"]}
                          >
                            {usuario.id} - {usuario.nome}
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
                            <Text fontSize={"xs"}>{usuario.cpf}</Text>
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
                            <Text fontSize={"xs"}>{usuario.email}</Text>
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
                                colorScheme={usuario.ativo ? "green" : "red"}
                              >
                                {usuario.ativo ? "Ativo" : "Inativo"}
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
                <Text>Falha ao obter os dados dos usuarios</Text>
              </Flex>
            ) : (
              <ReactTable columnsHeader={columns} data={tableData} />
            )}
          </MotionBox>
        </AnimatePresence>
      </Flex>
    </Box>
  );
}
