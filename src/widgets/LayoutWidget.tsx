import React, { ReactNode, Suspense } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Layout from '../views/Layout';
import LoaderWidget from './LoaderWidget';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuthUser } from '../redux/auth.redux';

interface Props {
  children?: ReactNode,
}

const LayoutWidget: React.FC<Props> = ({ children }: Props) => {
  const { url } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(selectAuthUser);

  return (
    <Layout
      user={user}
      currentUrl={url}
      onLogout={() => {
        dispatch(logout());
        history.push('/login/');
      }}
    >
      {children}
    </Layout>
  );
};

export default LayoutWidget;
