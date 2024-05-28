'use client';
import React from 'react';
import Head from 'next/head';
import { Link, Text } from '@chakra-ui/react';

import { Main } from '../layout/Main/Main';

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>AGE-Viewer-2.0</title>
      </Head>
      <Main>
        <Text fontSize={'5xl'}>AGE-Viewer-2.0</Text>
        <hr />
        <Text fontSize={'3xl'}>
          Welcome to AGE-Viewer-2.0 this project is{' '}
          <span
            style={{
              color: 'red',
            }}
          >
            work in progress
          </span>
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
      </Main>
    </React.Fragment>
  );
}
