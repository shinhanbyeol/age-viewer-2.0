'use client';
import React from 'react';
import Head from 'next/head';
// layout
import { Main } from '../layout/Main/Main';
// feature
import Debugger from '../components/Debugger';
import { Text } from '@chakra-ui/react';

export default function Debug() {
  return (
    <React.Fragment>
      <Head>
        <title>AGE-Viewer-2.0:debugger</title>
      </Head>
      <Main>
        <div>
          <Text fontSize={'4xl'}>AGE-Viewer-2.0 IPC Debgger</Text>
          <Text fontSize={'4xl'}>this page is for IPC test</Text>
        </div>
        <Debugger type="test" name="test" data={{ test: 'test' }} />
      </Main>
    </React.Fragment>
  );
}
