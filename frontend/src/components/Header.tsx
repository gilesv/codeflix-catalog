import React, { useState} from "react";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import { DarkModeSwitch } from "./DarkModeSwitch";
import Link from 'next/link';

const MenuItems = ({ children }: { children: any }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header = (props: any) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="gray.700"
      color="white"
      {...props}
    >
      <Flex align="center" mr={55}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          codeflix
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems><Link href="/">Filmes</Link></MenuItems>
        <MenuItems><Link href="/categories">Categorias</Link></MenuItems>
        <MenuItems>Gêneros</MenuItems>
        <MenuItems>Cast</MenuItems>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <DarkModeSwitch />
      </Box>
    </Flex>
  );
};

export default Header;
