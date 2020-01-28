type RetryFn = (() => void) | null;

export default class ErrorCapsule {
  error: Error;

  retry: RetryFn;

  constructor(error: Error, retry: RetryFn = null) {
    this.error = error;
    this.retry = retry || null;
  }
}
