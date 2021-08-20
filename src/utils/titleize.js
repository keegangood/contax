/**
 * Capitalize the first letter after a space in a string.
 * Leading punctuations are not supported.
 * 
 * @param {string} string Capitalize the first letter of each word 
 */
 const titleize = (string) => {
  let letters = [...string];
  letters = letters.map((letter, i, arr)=> (i === 0 || letters[i-1] === ' ') ? letter.toUpperCase() : letter.toLowerCase())
  return letters.join('')
}
  
export default titleize;