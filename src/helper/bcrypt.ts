import * as bcrypt from 'bcrypt';

export async function comparePassword(
  rawPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  let hashToCompare = hashedPassword;

  if (hashedPassword.startsWith('$2y$')) {
    hashToCompare = hashedPassword.replace('$2y$', '$2b$');
  }

  return bcrypt.compare(rawPassword, hashToCompare);
}
