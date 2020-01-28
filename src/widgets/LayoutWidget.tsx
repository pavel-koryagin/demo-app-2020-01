import React, { ReactNode, Suspense } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Layout from '../views/Layout';
import LoaderWidget from './LoaderWidget';

interface Props {
  children?: ReactNode,
}

const LayoutWidget: React.FC<Props> = ({ children }: Props) => {
  const { url } = useRouteMatch();

  return (
    <Layout
      currentUrl={url}
      onLogout={() => { /* TODO: Logout */ }}
    >
      <Suspense fallback={<LoaderWidget />}>
        {children}
      </Suspense>
    </Layout>
  );
};

export default LayoutWidget;
