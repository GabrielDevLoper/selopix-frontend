import {
  Box,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useColorMode,
  Switch,
  Button,
  DrawerProps,
} from "@chakra-ui/react";
import SidebarNav from "./SidebarNav";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";

export default function Index() {
  const { colorMode } = useColorMode();

  const { isOpen, onClose } = useSidebarDrawer();

  const isDrawerSideBar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSideBar) {
    return (
      <Drawer isOpen={isOpen} placement={"left"} onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent
            bg={colorMode === "light" ? "gray.300" : "gray.800"}
            p="4"
          >
            <DrawerCloseButton mt={"6"} />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="10">
      <SidebarNav />
    </Box>
  );
}
