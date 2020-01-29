import BadRequestException from '../errors/BadRequestException';

export function requireId(value: string | undefined): number {
  if (!value) {
    throw new BadRequestException('Missing required id parameter');
  }
  if (!/^\d+$/.test(value)) {
    throw new BadRequestException('Incorrect id parameter value');
  }
  return Number(value);
}
