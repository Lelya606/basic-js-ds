const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.nodeNew = null;
  }

  root() {
    return this.nodeNew;
  }

  addChildrenNode(root, node) {
    if(node.data < root.data) {
      if(!root.left) {
        root.left = node;
        return;
      }
      this.addChildrenNode(root.left, node);
      return;
    }
    if(!root.right) {
      root.right = node;
      return;
    }
    this.addChildrenNode(root.right, node);
  }

  add(data) {
    const newNode = new Node(data);
    if(!this.nodeNew) {
      this.nodeNew = newNode;
      return;
    }
    this.addChildrenNode(this.nodeNew, newNode);
  }

  has(data) {
    return Boolean(this.searchNode(this.nodeNew, data));
  }

  find(data) {
    return this.searchNode(this.nodeNew, data);
  }

  remove(data) {
    if (!this.nodeNew) return;
    this.removeNode(this.nodeNew, data);
  }

  getMinNode(node) {
    if(!node) return null;
    if(!node.left) return node.data;
    return this.getMinNode(node.left);
  }

  getMAxNode(node) {
    if(!node) return null;
    if(!node.right) return node.data;
    return this.getMAxNode(node.right);
  }

  min() {
    if(!this.nodeNew) return null;
    return this.getMinNode(this.nodeNew);
  }

  max() {
    if(!this.nodeNew) return null;
    return this.getMAxNode(this.nodeNew);
  }

  searchNode(node, data) {
    if(!node) return null;
    if(data < node.data) return this.searchNode(node.left, data);
    if(data > node.data) return this.searchNode(node.right, data);
    return node;
  }

  removeNode(root, data) {
    if(root.data) return;
    if(data < root.data) {
      root.left = this.removeNode(root.left, data);
      return root;
    }
    if(data > root.data) {
      root.right = this.removeNode(root.right, data);
      return root;
    }

    if(!root.left && !root.right) {
      root = null;
      return root;
    }

    if(!root.left) {
      root = root.right;
      return root;
    }

    if(!root.right) {
      root = root.left;
      return root;
    }

    let minNode = this.min(root.right);
    root.data = minNode.data;

    root.right = this.removeNode(root.right, minNode.data);
    return root;
  }
}

module.exports = {
  BinarySearchTree
};