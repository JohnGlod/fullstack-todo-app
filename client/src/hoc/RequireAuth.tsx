import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import { UserContext } from '../main';

export const RequireAuth = observer(({ children }: { children: JSX.Element }) => {
  const { store } = useContext(UserContext);
  if (!store.isAuth) {
    return <Navigate to="/" />;
  }

  return children;
});
