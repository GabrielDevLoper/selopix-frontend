import Link, { LinkProps } from "next/link";
import { cloneElement, ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import { useColorMode } from "@chakra-ui/react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export default function ActiveLink({
  shouldMatchExactHref = false,
  children,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();
  const { colorMode } = useColorMode();

  let isActive = false;

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive
          ? "blue.500"
          : colorMode === "light"
          ? "gray.600"
          : "gray.300",
      })}
    </Link>
  );
}
