import { isAddress } from 'ethers';

export const truncateAddress = (address: string) => {
  if (!isAddress(address)) {
    return '';
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
