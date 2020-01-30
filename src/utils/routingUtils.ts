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

export function requireUint(value: string | undefined): number {
  if (!value) {
    throw new BadRequestException('Missing required number parameter');
  }
  if (!/^\d+$/.test(value)) {
    throw new BadRequestException('Incorrect number parameter value');
  }
  return Number(value);
}

export function requireDate(value: string | undefined): string {
  if (!value) {
    throw new BadRequestException('Missing required date parameter');
  }
  if (!/^\d\d\d\d-\d\d-\d\d$/.test(value)) {
    throw new BadRequestException('Incorrect date parameter value');
  }
  return value;
}

export function requireTime(value: string | undefined): string {
  if (!value) {
    throw new BadRequestException('Missing required time parameter');
  }
  if (!/^\d\d:\d\d$/.test(value)) {
    throw new BadRequestException('Incorrect time parameter value');
  }
  return value;
}
