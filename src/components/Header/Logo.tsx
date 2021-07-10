import { Text } from "@chakra-ui/react";

interface LogoProps {
  fontSize?: string;
}

export default function Logo({ fontSize = null }: LogoProps) {
  return (
    <Text
      fontSize={!!fontSize ? fontSize : ["4xl", "4xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      bgGradient="linear(to-r, #0BC5EA,#00A3C4)"
      bgClip="text"
      w="100"
    >
      SeloPix
      <Text color="blue.500" as="span" ml="1">
        .
      </Text>
    </Text>
  );
}
