import { sign } from 'jsonwebtoken';

export function generateToken(
  payload: object,
  secret: string,
  expiresIn: string = '1d',
) {
  return sign(payload, secret, { expiresIn });
}
