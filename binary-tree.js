/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    let checked = 0;
    let toSearch = [this.root];
    while (toSearch.length) {
      checked++;
      let curr = toSearch.shift();
      if (!curr.left && !curr.right) break;
      if (curr.left) toSearch.push(curr.left);
      if (curr.right) toSearch.push(curr.right);
    }
    return 1 + Math.floor(Math.log2(checked));
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
    function getMaxDepth(node) {
      if (!node) return 0;
      return 1 + Math.max(
        getMaxDepth(node.left),
        getMaxDepth(node.right)
      );
    }
    return getMaxDepth(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0;
    let max = -Infinity;
    function getMaxSum(node) {
      if (!node) return 0;
      let lSum = getMaxSum(node.left);
      let rSum = getMaxSum(node.right);
      max = Math.max(max, lSum + rSum + node.val);
      return Math.max(0, lSum + node.val, rSum + node.val);
    }
    getMaxSum(this.root);
    return max;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;
    let min = null;
    let toSearch = [this.root];
    while (toSearch.length) {
      let curr = toSearch.pop();
      if (curr.val > lowerBound) {
        if (min === null) min = curr.val;
        else min = Math.min(min, curr.val);
      }
      if (curr.left) toSearch.push(curr.left);
      if (curr.right) toSearch.push(curr.right);
    }
    return min;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (this.root === node1 || this.root === node2) return false;

    function getDepth(node, target, depth = 0) {
      if (node === null) return null;
      if (node.left === target || node.right === target) return [node, depth];
      return getDepth(node.left, target, depth + 1) || getDepth(node.right, target, depth + 1);
    }

    const [p1, d1] = getDepth(this.root, node1);
    const [p2, d2] = getDepth(this.root, node2);
    return d1 === d2 && p1 !== p2;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const result = [];

    function helper(node, idx = 0) {
      if (!node) return;
      result[idx] = node.val;
      let childIdx = idx * 2 + 1;
      if (node.left) {
        helper(node.left, childIdx);
      }
      if (node.right) {
        helper(node.right, childIdx + 1);
      }
    }

    helper(tree.root);
    return JSON.stringify(result);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const arr = JSON.parse(stringTree);
    const nodes = arr.map(val => val !== null ? new BinaryTreeNode(val) : null)
      .map((node, idx, nodes) => {
        if (node) {
          const childIdx = idx * 2 + 1;
          node.left = nodes[childIdx] || null;
          node.right = nodes[childIdx + 1] || null;
        }
        return node;
      })
    return new BinaryTree(nodes[0]);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {

    function canFindFrom(node, target1, target2) {
      if (!node) return false;
      if (node === target1 || node === target2) return true;
      return canFindFrom(node.left, target1, target2) ||
        canFindFrom(node.right, target1, target2);
    }

    let curr = this.root;
    let inLeft, inRight, isCurr;
    while (true) {
      isCurr = curr === node1 || curr === node2;
      inLeft = canFindFrom(curr.left, node1, node2);
      inRight = canFindFrom(curr.right, node1, node2);
      
      if (inLeft && inRight) return curr;
      else if (isCurr && (inLeft || inRight)) return curr;
      else if (inLeft) curr = curr.left;
      else if (inRight) curr = curr.right;
    }
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
