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
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

import { ReactNode, ReactElement } from "react";

interface ModalProps {
  children: ReactNode;
  titleButton?: string;
  title: string;
  buttonElement: ReactElement;
}

export default function Modal({
  children,
  titleButton,
  title,
  buttonElement,
}: ModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Link size="xs" onClick={onOpen} color="blue.500">
        {buttonElement}
      </Link>
      <ChakraModal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="xl"
      >
        <ModalOverlay bg="rgba(0, 0, 0, 0.2)" />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
}
