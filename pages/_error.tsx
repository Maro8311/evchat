import { NextPage } from 'next';
import Link from 'next/link';

const ErrorPage: NextPage<{ statusCode?: number }> = ({ statusCode }) => {
  let message = 'An error occurred';
  if (statusCode === 404) {
    message = 'The page could not be found';
  } else if (statusCode === 500) {
    message = 'An internal server error occurred';
  }

  return (
    <div>
      <h1>{statusCode || 'Error'}</h1>
      <p>{message}</p>
      <p>
        Go back to{' '}
        <Link href="/">
          <a>homepage</a>
        </Link>
      </p>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode };
};

export default ErrorPage;