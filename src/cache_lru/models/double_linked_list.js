class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(data) {
    this.length++;
    const newNode = new ListNode(data);
    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    return newNode;
  }

  pop() {
    if (this.length === 0) {
      return null;
    }

    this.length--;
    const tail = this.tail;
    if (this.tail.prev) {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    } else {
      this.tail = this.head = null;
    }
    return tail;
  }

  moveNodeToHead(node) {
    if (this.tail === this.head) return;
    if (this.length === 2) {
      [this.head, this.tail] = [this.tail, this.head];
      return;
    }
    const prevNode = node.prev;
    const nextNode = node.next;
    if (prevNode) prevNode.next = nextNode;
    if (nextNode) nextNode.prev = prevNode;
    node = this.append(node);
  }
}

class ListNode {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

module.exports = DoubleLinkedList;
