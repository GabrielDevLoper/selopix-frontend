import { MenuGroup } from "@chakra-ui/react";
import { MenuDivider } from "@chakra-ui/react";
import { MenuItem } from "@chakra-ui/react";
import { MenuButton, MenuList } from "@chakra-ui/react";
import { Avatar, Box, Flex, Menu, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export default function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text fontSize="md">Gabriel Barreto</Text>
          {/* <Text color="gray.300" fontSize="small">gabriel.devloper@gmail.com</Text> */}
        </Box>
      )}
      <Menu>
        <MenuButton as={"button"}>
          <Avatar size="md" name="Gabriel Barreto" src="" />
        </MenuButton>
        <MenuList>
          <MenuGroup title="Pefil">
            <MenuItem>Minha conta</MenuItem>
            <MenuItem>Sair</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}
