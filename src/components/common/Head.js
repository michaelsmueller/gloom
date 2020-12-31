import React from 'react';
import { Helmet } from 'react-helmet';

export default function Head() {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Gloom</title>
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap'
          rel='stylesheet'
        />
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons+Round' rel='stylesheet' />
      </Helmet>
    </>
  );
}
