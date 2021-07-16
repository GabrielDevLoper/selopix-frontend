import { useColorMode } from "@chakra-ui/react";
import {
  Input as InputChakra,
  FormLabel,
  FormControl,
  InputProps as InputPropsChakra,
  FormErrorMessage,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputPropsChakra {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, label, ...rest },
  ref
) => {
  const { colorMode } = useColorMode();

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}:</FormLabel>}
      <InputChakra
        name={name}
        focusBorderColor="blue.500"
        variant="filled"
        size="lg"
        bg={colorMode === "light" ? "gray.200" : "gray.900"}
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
