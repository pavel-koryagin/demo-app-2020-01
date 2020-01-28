import React from 'react';
import ErrorCapsule from '../errors/ErrorCapsule';

interface Props {
  error: string | Error | ErrorCapsule,
}

const PageLoadFailedWidget: React.FC<Props> = ({ error }: Props) => {
  return (
    <div>TODO Show load error</div>
  );
};

export default PageLoadFailedWidget;
