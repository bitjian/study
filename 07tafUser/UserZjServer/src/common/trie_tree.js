import trie from 'trie';
const sensitiveWordUtils = {};

let myTrie = null;
let max_length = 0;

sensitiveWordUtils.init = function(keys) {
  myTrie = trie.createTrieFromArray(keys);
  for (const key of keys) {
    if (key.length > max_length) {
      max_length = key.length;
    }
  }
};

sensitiveWordUtils.hasWord = function(text) {
  const textLength = text.length;
  for (let i = 0; i <= textLength; i++) {
    for (let j = i + 1; j - i <= max_length + 1; j++) {
      const str = text.substring(i, j);
      if (!myTrie.isValidPrefix(str)) {
        break;
      }
      if (myTrie.lookup(str)) {
        return str;
      }
    }
  }
  return null;
};


export { sensitiveWordUtils };
