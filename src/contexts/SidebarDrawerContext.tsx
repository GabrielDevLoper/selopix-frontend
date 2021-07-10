import {createContext, ReactNode, useContext, useEffect} from "react";
import {useDisclosure, UseDisclosureReturn} from "@chakra-ui/react";
import {useRouter} from "next/router";

interface SidebarDrawerPrviderProps {
    children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({children}: SidebarDrawerPrviderProps) {
    const disclosure= useDisclosure();
    const router = useRouter();

    // server para que toda vez q acontecer uma troca de rota a sidebar e fechada
    useEffect(() => {
        disclosure.onClose();
    }, [router.asPath])

    return (
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);