import NavSection from "./NavSection";
import NavLink from "./NavLink";
import { RiContactsLine, RiDashboardLine } from "react-icons/ri";
import { BsCollection } from "react-icons/bs";
import { VStack } from "@chakra-ui/react";

export default function SidebarNav() {
  return (
    <VStack spacing="12" alignItems="flex-start">
      <NavSection title={"GERAL"}>
        <NavLink href={"/dashboard"} icon={RiDashboardLine}>
          Dashboard
        </NavLink>
        <NavLink href={"/usuarios"} icon={RiContactsLine}>
          Usuários
        </NavLink>
      </NavSection>

      <NavSection title={"PIX"}>
        <NavLink href={"/arrecadacoes"} icon={BsCollection}>
          Arrecadações Guias
        </NavLink>
        {/* <NavLink href={"/dashobard"} icon={BsCollection}>
          Arrecadações Guias
        </NavLink> */}
      </NavSection>
    </VStack>
  );
}
