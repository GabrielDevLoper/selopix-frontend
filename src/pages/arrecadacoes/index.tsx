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
import { useArrecadacaoGuias } from "../../service/hooks/useArrecadacaoGuias";
import React, { useState } from "react";

export default function ArrecadacaosListagem() {
  const [page, setPage] = useState(1);
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, data, error, isFetching } = useArrecadacaoGuias(page);

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  });

  return (
    <Box>
      <Header />
      <Flex overflowX="auto" w="100%" my="6" maxWidth={1800} mx="auto" px="6">
        <Sidebar />
        <Box
          flex="1"
          borderRadius={8}
          bg={colorMode === "light" ? "gray.300" : "gray.800"}
          p="8"
        >
          <Flex mb="8" justifyContent="space-between" alignItems="center">
            <Heading size={"md"} fontWeight="normal">
              Listagem de arrecadações guias
              {!isLoading && isFetching && (
                <Spinner size="md" color="gray.500" ml="4" />
              )}
            </Heading>
            <NextLink href="/arrecadacaos/create" passHref>
              <Button
                as="a"
                cursor="pointer"
                size="md"
                fontSize="md"
                colorScheme="blue"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                {/* <Icon as={RiAddLine} fontSize="20" /> */}
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isWideVersion ? (
            isLoading ? (
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
                        <Box flex="1" textAlign="left" fontSize={["sm", "md"]}>
                          {arrecadacao.id} - {arrecadacao.data_emissao}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Flex flexDir={"column"}>
                        <Flex flexDir={"row"}>
                          <Text fontSize={"xs"} mr={"4px"} fontWeight={"bold"}>
                            CPF:
                          </Text>
                          <Text fontSize={"xs"}>
                            {arrecadacao.data_emissao}
                          </Text>
                        </Flex>

                        <Flex flexDir={"row"} alignItems={"center"} mt={"10px"}>
                          <Text fontSize={"xs"} mr={"4px"} fontWeight={"bold"}>
                            Email:
                          </Text>
                          <Text fontSize={"xs"}>
                            {arrecadacao.data_emissao}
                          </Text>
                        </Flex>

                        <Flex flexDir={"row"} mt={"10px"}>
                          <Text fontSize={"xs"} mr={"4px"} fontWeight={"bold"}>
                            Ativo:
                          </Text>
                          <Text fontSize={"xs"}>
                            <Badge
                              variant="solid"
                              colorScheme={
                                arrecadacao.status_guia ? "green" : "red"
                              }
                            >
                              {arrecadacao.status_guia ? "Ativo" : "Inativo"}
                            </Badge>
                          </Text>
                        </Flex>

                        <Flex flexDir={"row"} mt={"10px"} alignItems={"center"}>
                          <Text fontSize={"xs"} mr={"4px"} fontWeight={"bold"}>
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
          ) : isLoading ? (
            <Flex justify={"center"}>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify={"center"}>
              <Text>Falha ao obter os dados dos arrecadacaos</Text>
            </Flex>
          ) : (
            <Table colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>ID DA ARRECADACAO</Th>
                  <Th>Data emissão</Th>
                  <Th>Data vencimento</Th>
                  <Th>Valor</Th>
                  <Th w="8">Status</Th>
                </Tr>
              </Thead>

              <Tbody>
                {data.data.map((arrecadacao) => (
                  <Tr key={arrecadacao.id}>
                    <Td px={["2", "4", "6"]}>
                      <Box>
                        <Link color="blue.500" onClick={onOpen}>
                          <Text fontSize="sm" fontWeight="bold">
                            {arrecadacao.id}
                          </Text>
                        </Link>

                        <Modal
                          closeOnOverlayClick={false}
                          onClose={onClose}
                          isOpen={isOpen}
                          isCentered
                        >
                          <ModalOverlay bg="rgba(0, 0, 0, 0.2)" />
                          <ModalContent>
                            <ModalHeader>Detalhes do usuário</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Flex flexDir={"column"}>
                                <Text>
                                  Cartorio:{" "}
                                  {arrecadacao.arrecadacao.cartorio.nome}
                                </Text>
                                <Text>CPF:</Text>
                              </Flex>
                            </ModalBody>
                            <ModalFooter>
                              <Button onClick={onClose}>Close</Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </Box>
                    </Td>
                    <Td px={["2", "4", "6"]}>
                      <Box>
                        <Text fontSize="md">{arrecadacao.arrecadacao.id}</Text>
                      </Box>
                    </Td>
                    <Td px={["2", "4", "6"]}>
                      <Box>
                        <Text fontSize="md">{arrecadacao.data_emissao}</Text>
                      </Box>
                    </Td>
                    <Td px={["2", "4", "6"]}>
                      <Box>
                        <Text fontSize="md">{arrecadacao.data_vencimento}</Text>
                      </Box>
                    </Td>
                    <Td px={["2", "4", "6"]}>
                      <Box>
                        <Text fontSize="md">{arrecadacao.valor}</Text>
                      </Box>
                    </Td>
                    <Td px={["2", "4", "6"]}>
                      <Box borderRadius={"4px"}>
                        <Badge
                          colorScheme={
                            arrecadacao.status_guia ? "green" : "red"
                          }
                          p="1"
                          borderRadius="6"
                        >
                          {arrecadacao.status_guia ? "Ativo" : "Inativo"}
                        </Badge>
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}

          <Pagination
            totalCountOfRegister={466}
            onPageChange={setPage}
            currentPage={page}
          />
        </Box>
      </Flex>
    </Box>
  );
}
