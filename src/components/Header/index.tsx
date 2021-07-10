import {
  Flex,
  Icon,
  IconButton,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import Profile from "./Profile";
import Logo from "./Logo";
import NotificationNavs from "./NotificationNavs";
import SearchBox from "./SearchBox";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { RiMenuLine } from "react-icons/ri";

export default function Index() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { onOpen } = useSidebarDrawer();

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1800}
      h="20"
      mx="auto"
      mt="4"
      px={"6"}
      alignItems="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label={"Abrir navegação"}
          icon={<Icon as={RiMenuLine} />}
          fontSize={"24"}
          variant={"unstyled"}
          onClick={onOpen}
          mr="2"
        ></IconButton>
      )}
      <Logo />
      {/*<SearchBox />*/}
      <Flex alignItems="center" ml="auto">
        <NotificationNavs />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
