import React from 'react';
import ErrorCapsule from '../errors/ErrorCapsule';

interface Props {
  error: string | Error | ErrorCapsule,
}

function decodeException(error: Error) {
  return error.message;
}

function decodeError(error: string | Error | ErrorCapsule) {
  if (error instanceof ErrorCapsule) {
    return { message: decodeException(error.error), onRetry: error.retry };
  }
  if (error instanceof Error) {
    return { message: decodeException(error), onRetry: null };
  }
  return { message: error, onRetry: null };
}

const PageLoadFailedWidget: React.FC<Props> = ({ error }: Props) => {
  const { message, onRetry } = decodeError(error);

  // TODO: Replace with Material UI
  return (
    <div className="alert alert-danger">
      <p>
        <strong>Load failed.</strong>
        {onRetry && (
          <button type="button" className="btn btn-link" onClick={onRetry}>Click to retry</button>
        )}
      </p>
      <p>{message}</p>
    </div>
  );
};

export default PageLoadFailedWidget;
