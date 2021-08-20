/**
 * Capitalize the first letter after a space in a string.
 * Leading punctuations are not supported.
 *
 * @param {phoneNumber} string return the phone number in (xxx) xxx-xxxx format
 */
const formatPhoneNumber = (phoneNumber) => {

  let formattedPhoneNumber = '';
  if (phoneNumber.length > 0) {
    formattedPhoneNumber += `(${phoneNumber.slice(0, 3)})`;
  }
  if (phoneNumber.length > 3) {
    formattedPhoneNumber += ` ${phoneNumber.slice(3, 6)}`;
  } 
  if (phoneNumber.length > 6) {
    formattedPhoneNumber += `-${phoneNumber.slice(6, 10)}`;
  }

  return formattedPhoneNumber;
};

export default formatPhoneNumber;
