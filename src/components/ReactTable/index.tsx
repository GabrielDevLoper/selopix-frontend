import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table as ChakraTable,
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
  SimpleGrid,
} from "@chakra-ui/react";
import {
  AiOutlineFilePdf,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { ArrecadacaoGuia } from "../../service/hooks/useArrecadacaoGuias";
import { useState, useMemo } from "react";
import {
  useTable,
  useSortBy,
  Cell,
  useGlobalFilter,
  useFilters,
  usePagination,
  useResizeColumns,
} from "react-table";

import ColumnFilter from "./columnFilter";
import { Input } from "../Form/Input";
import { Stack } from "@chakra-ui/react";

interface TableProps {
  data: any[];
  columnsHeader: any[];
}

export default function Table({ data, columnsHeader }: TableProps) {
  const { colorMode } = useColorMode();

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  );

  const columns = useMemo(() => columnsHeader, []);

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    canPreviousPage,
    canNextPage,
    state,
    setGlobalFilter,
    pageOptions,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <Box
        flex={"1"}
        borderRadius={8}
        p={["6", "8"]}
        mb="15px"
        bg={colorMode === "light" ? "gray.300" : "gray.800"}
      >
        {/* <Flex mb="8" justifyContent="space-between" alignItems="center">
            <Heading size={"md"} fontWeight="normal">
                  Buscar guias
                </Heading>
          </Flex> */}

        <VStack spacing={"4"}>
          <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w={"100%"}>
            <Input
              name={"search"}
              label={"Filtre por qualquer coluna da tabela"}
              placeholder="Filtre por qualquer coluna da tabela"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              size="md"
            />
          </SimpleGrid>
        </VStack>
      </Box>

      <ChakraTable colorScheme="blackAlpha" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th w="10" key={column.id} {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <HStack mt="2" ml="-1">
                    {column.canFilter ? column.render("Filter") : null}
                  </HStack>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td
                    px={["4", "4", "6"]}
                    key={cell.row}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>

      <Stack
        direction={["column", "row"]}
        mt="8"
        justifyContent="space-between"
        alignItems="center"
        spacing="6"
      >
        <Box>
          <strong>{pageIndex + 1}</strong> -{" "}
          <strong>{pageOptions.length}</strong> de um total de{" "}
          <strong>{data.length} </strong>registros
        </Box>
        <Stack direction="row" spacing="2">
          <Button
            size="sm"
            fontSize="lg"
            w="10px"
            bg={"blue.500"}
            color={"white"}
            _hover={{ bg: "blue.700" }}
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            <Icon as={AiOutlineArrowLeft} />
          </Button>
          <Button
            size="sm"
            fontSize="lg"
            w="4"
            bg={"blue.500"}
            color={"white"}
            _hover={{ bg: "blue.700" }}
            disabled={!canNextPage}
            onClick={() => nextPage()}
          >
            <Icon as={AiOutlineArrowRight} />
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
