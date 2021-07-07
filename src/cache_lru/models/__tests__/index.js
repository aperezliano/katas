const DoubleLinkedList = require('../double_linked_list');

it('creates a new List', () => {
  expect(new DoubleLinkedList()).not.toBeNull();
});

it('appends an element', () => {
  const list = new DoubleLinkedList();
  list.append(3);
  expect(list.head.data).toBe(3);
  expect(list.tail.data).toBe(3);
  expect(list.head.prev).toBeNull();
  expect(list.tail.next).toBeNull();
  expect(list.head.next).toBeNull();
});

it('appends 2 elements', () => {
  const list = new DoubleLinkedList();
  list.append(1);
  list.append(2);
  expect(list.head.data).toBe(2);
  expect(list.tail.data).toBe(1);
  expect(list.tail.next).toBeNull();
  expect(list.head.prev).toBeNull();
  expect(list.head.next).toBe(list.tail);
  expect(list.tail.prev).toBe(list.head);
});

it('pops and empty list', () => {
  const list = new DoubleLinkedList();
  list.pop();
  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();
  expect(list.length).toBe(0);
});

it('pops a list with 1 element', () => {
  const list = new DoubleLinkedList();
  list.append(1);
  const element = list.pop();
  expect(element.data).toBe(1);
  expect(list.tail).toBeNull();
  expect(list.head).toBeNull();
  expect(list.length).toBe(0);
});

it('moves and element to the head', () => {
  const list = new DoubleLinkedList();
  const node1 = list.append(1);
  const node2 = list.append(2);
  list.moveNodeToHead(node1);
  expect(list.head).toBe(node1);
  expect(list.tail).toBe(node2);
});
