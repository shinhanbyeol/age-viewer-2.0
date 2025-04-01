'use client';
import React from 'react';
import Head from 'next/head';
import { Box, Link, Text } from '@chakra-ui/react';

import { Main } from '../layout/Main/Main';

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Graph Explorer Client</title>
      </Head>
      <Main>
        <Box padding={10} textAlign={'center'}>
          <Text fontSize={'5xl'}>Graph Explorer Client</Text>
          <hr />
          <Text fontSize={'3xl'}>
            Welcome to GEC (Graph Explorer Client) project
          </Text>
          <br />
          <Text fontSize={'xl'}>
            GEC is a graph database client for visualization that supports
            Apache AGE, AgensGraph.
          </Text>
          <Text fontSize={'xl'}>
            to be continue for neo4j and other graph databases
          </Text>
          <br />
          <Text fontSize={'xl'}>
            if you want to contribute to this project please visit the{' '}
            <Link
              color={'blue'}
              href="https://github.com/shinhanbyeol/age-viewer-2.0"
              target="_blank"
            >
              github
            </Link>
          </Text>
          <Text fontSize={'xl'}>
            if you want suggest a feature or report a bug please visit the{' '}
            <Link
              color={'blue'}
              href="https://github.com/shinhanbyeol/age-viewer-2.0/discussions"
              target="_blank"
            >
              discussion
            </Link>{' '}
            or create an{' '}
            <Link
              color={'blue'}
              href="https://github.com/shinhanbyeol/age-viewer-2.0/issues"
              target="_blank"
            >
              issue
            </Link>{' '}
            on github
          </Text>
          <Text fontSize={'xl'}>
            i am in the process of developing a backend function for
            AGE-Viewer-2.0, you can{' '}
            <Link
              color={'blue'}
              href="https://github.com/shinhanbyeol/age-viewer-2.0/tree/main/main"
              target="_blank"
            >
              check
            </Link>
          </Text>
        </Box>
      </Main>
    </React.Fragment>
  );
}
