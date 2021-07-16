import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {
  Flex,
  SimpleGrid,
  Box,
  Text,
  theme,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

const MotionBox = motion(Box);

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },

  grid: {
    show: false,
  },

  dataLabels: {
    enabled: false,
  },

  tooltip: {
    enabled: true,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2021-03-18T00:00:00.000Z",
      "2021-03-19T00:00:00.000Z",
      "2021-03-20T00:00:00.000Z",
      "2021-03-21T00:00:00.000Z",
      "2021-03-22T00:00:00.000Z",
      "2021-03-23T00:00:00.000Z",
    ],
  },

  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [{ name: "series1", data: [31, 120, 10, 50, 109, 200] }];

export default function Dashboard() {
  const { colorMode } = useColorMode();

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1800} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <AnimatePresence>
            <MotionBox
              p={["6", "8"]}
              bg={colorMode === "light" ? "gray.300" : "gray.800"}
              borderRadius={8}
              pb="4"
            >
              <Text fontSize="lg" mb="4">
                Total Arrecadações
              </Text>
              {/* @ts-ignore-error */}
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            </MotionBox>
          </AnimatePresence>

          <Box
            p={["6", "8"]}
            bg={colorMode === "light" ? "gray.300" : "gray.800"}
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">
              Total Arrecadações
            </Text>
            {/* @ts-ignore-error */}
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
