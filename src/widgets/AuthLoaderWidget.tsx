import React, { ReactNode, useEffect, useState } from 'react';
import LoaderWidget from './LoaderWidget';
import { useDispatch } from 'react-redux';
import { authStateInit } from '../redux/auth.redux';
import LayoutWidget from './LayoutWidget';
import ErrorCapsule from '../errors/ErrorCapsule';

interface Props {
  children: ReactNode,
}

const AuthLoaderWidget: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<true | false | ErrorCapsule>(true);

  async function initAuth() {
    try {
      await authStateInit(dispatch);
      setLoading(false);
    } catch (e) {
      setLoading(new ErrorCapsule(e, () => {
        initAuth();
      }));
    }
  }

  useEffect(() => {
    initAuth();
  }, []);

  if (loading) {
    return (
      <LayoutWidget>
        <LoaderWidget />
      </LayoutWidget>
    );
  }

  return <>{children}</>;
};

export default AuthLoaderWidget;
