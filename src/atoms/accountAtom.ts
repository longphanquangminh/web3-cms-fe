import { atom } from 'jotai';
import { IProvider } from '@web3auth/base';

export const userAtom = atom<string | null>('' as string);
export const providerAtom = atom<IProvider | null>({} as IProvider);
