class Trie {
  constructor() {
    this.root = new Node();
  }

  addPath(values) {
    let currentNode = this.root;
    for (let value of values) {
      let node = currentNode.children.find((e) => e.data === value);
      if (node) {
        currentNode = node;
      } else {
        node = new Node(value);
        currentNode.isLeaf = false;
        currentNode.children.push(node);
        currentNode = node;
      }
    }
  }

  hasPrefixInserted(values) {
    let currentNode = this.root;
    for (let value of values) {
      let node = currentNode.children.find((e) => e.data === value);
      if (node) {
        currentNode = node;
        if (node.isLeaf) return true;
      } else {
        return false;
      }
    }
    return false;
  }
}

class Node {
  constructor(data = null, isLeaf = true) {
    this.data = data;
    this.children = [];
    this.isLeaf = isLeaf;
  }
}

function getPrefixed(numbers) {
  const orderedNumbers = numbers.sort((a, b) => a.length - b.length);
  const trie = new Trie();

  for (let number of orderedNumbers) {
    const digits = [...number];
    if (trie.hasPrefixInserted(digits)) return true;
    trie.addPath(digits);
  }

  return false;
}

module.exports = getPrefixed;
