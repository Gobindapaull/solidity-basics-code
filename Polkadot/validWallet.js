const { decodeAddress, encodeAddress } = require('@polkadot/keyring');
const { hexToU8a, isHex } = require('@polkadot/util');

const address = '14J2f1DoL8KdUBpfERfMHoyy1q3vXcE2HyG3SXeoDMpvPfkp';

const isValidAddressPolkadotAddress = () => {
  try {
    encodeAddress(
      isHex(address)
        ? hexToU8a(address)
        : decodeAddress(address)
    );

    return true;
  } catch (error) {
    return false;
  }
};

const isValid = isValidAddressPolkadotAddress();

console.log(isValid);
