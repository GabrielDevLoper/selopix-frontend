import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../service";

type SignInCredentials = {
  cpf: string;
  senha: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  usuario: Usuario;
  logout: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

type Cartorio = {
  nome: string;
  cnpj: string;
  cns: number;
};

type Perfis = {
  id: number;
  nome: string;
};

type Usuario = {
  id: number;
  nome: string;
  cpf: string;
  cns: string;
  email: string;
  cartorio?: Cartorio;
  perfis: Perfis[];
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const router = useRouter();
  const toast = useToast();
  const [usuario, setUsuario] = useState<Usuario>({} as Usuario);

  const isAuthenticated = !!usuario;

  useEffect(() => {
    const { "@selopix.token": token } = parseCookies();

    if (token) {
      api
        .get("/usuario-logado")
        .then((response) => {
          const {
            usuario: { id, nome, cpf, cns, email, cartorio },
            perfis,
          } = response.data;

          setUsuario({
            cns,
            cpf,
            email,
            id,
            nome,
            cartorio,
            perfis,
          });
        })
        .catch((error) => {
          logout();
        });
    }
  }, []);

  async function signIn({ cpf, senha }: SignInCredentials) {
    try {
      const response = await api.post("/autenticar", {
        cpf,
        senha,
      });

      const {
        token,
        usuario: { nome, email, cns, id, cartorio },
        perfis,
      } = response.data;

      if(!token){
        toast({
          title: "Credenciais inválidas",
          description: "Por favor revise as credenciais inseridas",
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });

        return ;
      }

      setUsuario({
        cns,
        cpf,
        id,
        nome,
        email,
        cartorio,
        perfis,
      });

      setCookie(undefined, "@selopix.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      router.push("/dashboard");
    } catch (err) {
      toast({
        title: "Servidor interno",
        description: "Por favor volte em outro momento, estamos em manuntenção",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
  }

  function logout() {
    destroyCookie(undefined, "@selopix.token");

    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, usuario, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
