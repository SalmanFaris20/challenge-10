import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

export default function editMiddleware({ props }) {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (auth.authenticatedUser) {
      router.push('/profile');
    }
  }, [auth.authenticatedUser]);

  return <div>{props.children}</div>;
}
