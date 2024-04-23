"use client";
import React from "react";
import Head from "next/head";

// layout
import { Container } from "../layout/Container";
import { Sidebar } from "../layout/Sidebar/Sidebar";
import { Main } from "../layout/Main/Main";

// material
import { Divider } from "@chakra-ui/react";

// hook
import { useResizable } from "react-resizable-layout";

export default function HomePage() {
  const { position, separatorProps } = useResizable({
    axis: "x",
  });
  return (
    <React.Fragment>
      <Head>
        <title>AGE-Viewer-2.0</title>
      </Head>
      <Container minHeight="100vh">
        <Sidebar x={position} />
        <Divider
          orientation="vertical"
          width={1}
          height={"100vh"}
          _hover={{
            bg: "blue.500",
            cursor: "ew-resize",
          }}
          {...separatorProps}
        />
        <Main />
      </Container>
    </React.Fragment>
  );
}
