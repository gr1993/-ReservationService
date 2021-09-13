/**
 * Salt를 이용한 단방향 암호화 라이브러리입니다.
 */
import { pbkdf2, randomBytes } from 'crypto';
import { promisify } from 'util';

const randomBytesAsync = promisify(randomBytes);
const pbkdf2Async = promisify(pbkdf2);

export class EncryptOption {
  /** 반복횟수 */
  iteration?: number = 102041;

  /** 해시 알고리즘. 기본값은 sha1 입니다. (주의) sha1은 프로덕션에서 사용하지 마십시오. */
  digest?: 'sha1' | 'sha512' = 'sha1';

  /** 입력받은 Salt 값. 없는 경우 랜덤 값으로 생성됩니다. */
  salt?: Buffer;

  /**
   * 입력한 Salt가 없는 경우 랜덤으로 생성할 Salt의 크기입니다.
   * 권장 크기는 16 byte 이상입니다.
   */
  saltSize?: number = 64;

  /** 생성할 Key의 크기로 단위는 byte 입니다. */
  keySize?: number = 64;
}

export interface EncryptResult {
  /** 암호화에 사용된 Salt */
  salt: Buffer;

  /** 암호화 이전의 평문 */
  text: string;

  /** 암호화 된 base64 형식의 값 */
  encryptedText: string;
}

/**
 * 랜덤 Salt를 생성합니다.
 * @param size
 */
async function createSaltBuffer(size: number): Promise<Buffer> {
  return await randomBytesAsync(size);
}

/**
 * 평문의 문자열을 임의로 생성된 Salt를 이용해 암호화 합니다.
 * @param text
 * @param option
 */
export async function encrypt(
  text: string,
  option?: EncryptOption,
): Promise<EncryptResult> {
  const opt = { ...new EncryptOption(), ...option } as EncryptOption;

  let salt = opt.salt;

  if (!salt) {
    salt = await createSaltBuffer(opt.saltSize);
  }

  const key = await pbkdf2Async(
    text,
    salt,
    opt.iteration,
    opt.keySize,
    opt.digest,
  );

  return {
    salt,
    text,
    encryptedText: key.toString('base64'),
  };
}
