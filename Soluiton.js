/**
 * @param {string} s
 * @return {string}
 */
var shortestPalindrome = function(s) {
    const rev = s.split('').reverse().join('');
    const combined = s + '#' + rev;
    
    const lps = buildLPS(combined); // Longest Prefix Suffix array
    
    // The characters from the reverse of s that are not part of the palindrome prefix
    const toAdd = rev.slice(0, s.length - lps[lps.length - 1]);
    
    return toAdd + s;
};

/**
 * Builds the Longest Prefix Suffix (LPS) array used in KMP algorithm.
 * @param {string} s
 * @return {number[]}
 */
function buildLPS(s) {
    const lps = new Array(s.length).fill(0);
    let length = 0;
    let i = 1;
    
    while (i < s.length) {
        if (s[i] === s[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    
    return lps;
}
