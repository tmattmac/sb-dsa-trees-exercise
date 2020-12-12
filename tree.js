/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;
    let sum = 0;
    let toSearch = [this.root];
    while (toSearch.length) {
      let curr = toSearch.pop();
      sum += curr.val;
      toSearch.push(...curr.children);
    }
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;
    let evens = 0;
    let toSearch = [this.root];
    while (toSearch.length) {
      let curr = toSearch.pop();
      if (curr.val % 2 === 0) evens++;
      toSearch.push(...curr.children);
    }
    return evens;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;
    let amt = 0;
    let toSearch = [this.root];
    while (toSearch.length) {
      let curr = toSearch.pop();
      if (curr.val > lowerBound) amt++;
      toSearch.push(...curr.children);
    }
    return amt;
  }
}

module.exports = { Tree, TreeNode };
