import { MenuGroup } from "@chakra-ui/react";
import { MenuDivider } from "@chakra-ui/react";
import { MenuItem } from "@chakra-ui/react";
import { MenuButton, MenuList } from "@chakra-ui/react";
import { Avatar, Box, Flex, Menu, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface ProfileProps {
  showProfileData: boolean;
}

export default function Profile({ showProfileData = true }: ProfileProps) {
  const { usuario, logout } = useContext(AuthContext);

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text fontSize="md">{usuario?.nome}</Text>
          <Text color="gray.300" fontSize="small">
            {usuario.cpf}
          </Text>
        </Box>
      )}
      <Menu>
        <MenuButton as={"button"}>
          <Avatar size="md" name="Gabriel Barreto" src="" />
        </MenuButton>
        <MenuList>
          <MenuGroup title="Pefil">
            <MenuItem>Minha conta</MenuItem>
            <MenuItem onClick={logout}>Sair</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}
