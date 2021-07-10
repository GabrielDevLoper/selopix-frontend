import {HStack, Icon, useColorMode, IconButton} from "@chakra-ui/react";
import {RiNotificationOffFill, RiUserAddLine} from "react-icons/ri";
import { FaMoon, FaSun } from "react-icons/fa";

export default function NotificationNavs(){
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <HStack
            spacing={["6","8"]}
            mx={["6","8"]}
            pr={["6","8"]}
            py="1"
            color="gray.300"
            borderRightWidth={1}
            borderColor="gray.700"
        >
            {/*<Icon as={RiNotificationOffFill} fontSize="20"/>*/}
            {/*<Icon as={RiUserAddLine} fontSize="20"/>*/}
            <IconButton
                aria-label="Toggle color mode"
                onClick={toggleColorMode}
                color={colorMode === "light" ? "black" : "yellow.500"}
                icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
                borderRadius={20}
            />

        </HStack>
    );
}