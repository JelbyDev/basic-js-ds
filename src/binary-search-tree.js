const { NotImplementedError } = require("../extensions/index.js");
const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    let newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      let currentNode = this.rootNode;
      while (currentNode) {
        if (currentNode.data > data) {
          if (!currentNode.left) break;
          currentNode = currentNode.left;
        } else {
          if (!currentNode.right) break;
          currentNode = currentNode.right;
        }
      }
      data > currentNode.data
        ? (currentNode.right = newNode)
        : (currentNode.left = newNode);
    }
  }

  has(data) {
    if (this.find(data)) return true;
    return false;
  }

  find(data, currentNode = this.rootNode) {
    if (!currentNode) return null;
    if (currentNode.data === data) {
      return currentNode;
    } else if (currentNode.data < data) {
      return this.find(data, currentNode.right);
    } else {
      return this.find(data, currentNode.left);
    }
  }

  remove(data, currentNode = this.rootNode) {
    if (!currentNode) return false;
    if (currentNode.data > data) {
      currentNode.left = this.remove(data, currentNode.left);
    } else if (currentNode.data < data) {
      currentNode.right = this.remove(data, currentNode.right);
    } else {
      if (!currentNode.left && !currentNode.right) {
        currentNode = null;
      } else if (!currentNode.left) {
        currentNode = currentNode.right;
      } else if (!currentNode.right) {
        currentNode = currentNode.left;
      } else {
        let minRightNodeData = this.min(currentNode.right);
        currentNode.data = minRightNodeData;
        currentNode.right = this.remove(minRightNodeData, currentNode.right);
      }
    }
    return currentNode;
  }

  min(currentNode = this.rootNode) {
    if (!this.rootNode) return null;
    if (!currentNode.left) return currentNode.data;
    return this.min(currentNode.left);
  }

  max(currentNode = this.rootNode) {
    if (!this.rootNode) return null;
    if (!currentNode.right) return currentNode.data;
    return this.max(currentNode.right);
  }
}

module.exports = {
  BinarySearchTree,
};
