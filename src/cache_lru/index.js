const DoubleLinkedList = require('./models/double_linked_list');

class CacheLRU {
  // Default small size for testing purposes
  constructor(size = 3) {
    this.entries = new Map();
    this.list = new DoubleLinkedList();
    this.size = size;
  }

  getData(data) {
    if (this.entries.has(data)) {
      const dataNode = this.entries.get(data);
      this.list.moveNodeToHead(dataNode);
      return dataNode;
    }
    if (this.list.length < this.size) {
      this.list.append(data);
      this.entries.set(data, this.list.head);
      return this.entries.get(data);
    }
    const last = this.list.pop();
    this.entries.delete(last.data);
    const newElement = this.list.append(data);
    this.entries.set(data, newElement);
  }

  getLastestUsedData() {
    return this.list.head?.data;
  }
}

module.exports = CacheLRU;
