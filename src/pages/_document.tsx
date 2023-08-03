import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head title='Climate Quest' />
      <body className='bg-gray-300 dark:bg-slate-900 dark:text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
