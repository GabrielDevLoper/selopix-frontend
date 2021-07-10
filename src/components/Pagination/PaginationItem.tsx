import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: boolean;
  numberPage: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  numberPage,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="blue"
        disabled
        _disabled={{ bgColor: "blue.500", cursor: "default" }}
      >
        {numberPage}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      colorScheme="blue"
      onClick={() => onPageChange(numberPage)}
    >
      {numberPage}
    </Button>
  );
}
