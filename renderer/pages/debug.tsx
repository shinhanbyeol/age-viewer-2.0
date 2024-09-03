'use client';
import React from 'react';
import Head from 'next/head';
// layout
import { Main } from '../layout/Main/Main';
// feature
import Debugger from '../components/features/Debugger';
import { Text } from '@chakra-ui/react';

export default function Debug() {
  return (
    <React.Fragment>
      <Head>
        <title>AGE-Viewer-2.0:debugger</title>
      </Head>
      <Main>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '1rem',
          }}
        >
          <Text fontSize={'4xl'}>IPC test Result</Text>
          <Debugger />
        </div>
      </Main>
    </React.Fragment>
  );
}
