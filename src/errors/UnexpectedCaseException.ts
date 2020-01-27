import AppException from './AppException';

/**
 * Never use this to handle user input
 *
 * This exception is to terminate bugs. I.e. throw it in situations, that should never happen
 * according to the correct implementation
 */
export default class UnexpectedCaseException extends AppException {
  constructor(message?: string) {
    super(message || 'Unexpected case');
  }
}
