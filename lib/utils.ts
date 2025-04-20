import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { JSEncrypt } from 'jsencrypt';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const encryptData = (publicKey: string, data: string) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  const encrypted = encrypt.encrypt(data);
  return encrypted;
};
