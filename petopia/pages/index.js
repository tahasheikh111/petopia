// pages/index.js
import { getSession } from 'next-auth/react';

export default function HomePage(props) {
  return <h1>Welcome to the Home Page {props.session.user.name}</h1>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Redirect to login if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  // Pass session data to the page as props if needed
  return {
    props: { session },
  };
}
