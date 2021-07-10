import {Stack, Button, Box, Text} from "@chakra-ui/react";
import {PaginationItem} from "./PaginationItem";

interface PaginationProps {
    totalCountOfRegister: number;
    registerPerPage?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
}

// irmãs da pagina atual que vão ficar ao lado
const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)].map((_, index) => {
        return from + index + 1
    }).filter(page => page > 0);
}

export function Pagination({
                               totalCountOfRegister,
                               registerPerPage = 10,
                               currentPage = 1,
                               onPageChange
                           }: PaginationProps) {

    const lastPage = Math.floor(totalCountOfRegister / registerPerPage);


    const previousPages = currentPage > 1
        ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
        : []

    const nextPages = currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
        : [];

    return (
        <Stack
            direction={["column", "row"]}
            mt="8"
            justifyContent="space-between"
            alignItems="center"
            spacing="6"
        >
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>{totalCountOfRegister}</strong>
            </Box>
            <Stack direction="row" spacing="2">

                {currentPage > (1 + siblingsCount) && (
                    <>
                        <PaginationItem numberPage={1} onPageChange={onPageChange}/>
                        {currentPage > (2 + siblingsCount) && <Text>...</Text>}
                    </>
                )}

                {previousPages.length > 0 && previousPages.map(page => {
                    return <PaginationItem key={page} numberPage={page} onPageChange={onPageChange}/>
                })}

                {/* pagina atual*/}
                <PaginationItem numberPage={currentPage} isCurrent onPageChange={onPageChange}/>

                {nextPages.length > 0 && nextPages.map(page => {
                    return <PaginationItem key={page} numberPage={page} onPageChange={onPageChange}/>
                })}

                {(currentPage + siblingsCount) < lastPage && (
                    <>
                        {(currentPage + 1 + siblingsCount) < lastPage && <Text>...</Text>}
                        <PaginationItem numberPage={lastPage} onPageChange={onPageChange}/>
                    </>
                )}
            </Stack>
        </Stack>
    );
}
