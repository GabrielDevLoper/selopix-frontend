import { Text, Box } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

interface LogoProps {
  fontSize?: string;
}

export default function Logo({ fontSize = null }: LogoProps) {
  return (
    <AnimatePresence>
      <MotionBox
        whileHover={{
          scale: 1.5,
          textShadow: "0px 0px 5px rgb(0, 163, 196)",
        }}
      >
        <Text
          fontSize={!!fontSize ? fontSize : ["4xl", "4xl"]}
          fontWeight="bold"
          letterSpacing="tight"
          bgGradient="linear(to-r, rgb(11, 197, 234),rgb(0, 163, 196))"
          bgClip="text"
          w="100"
        >
          SeloPix
          <Text color="blue.500" as="span" ml="1">
            .
          </Text>
        </Text>
      </MotionBox>
    </AnimatePresence>
  );
}
