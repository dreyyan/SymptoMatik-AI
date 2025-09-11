// Imports
import Node from "../logic/Node";

class LinkedList {
    
    // Constructor
    constructor(node) {
        this.head = null;
        this.size = node ? 1 : 0;
    }

    // Methods
    // [ METHOD ]: Add a node to the linked list
    append(value) {
        const newNode = new Node(value);

        if (!this.head) {
          this.head = newNode;
        } else {
          let current = this.head;
          while (current.next) { // go to last node
            current = current.next;
          }
          current.next = newNode;
        } this.size++;
    }

    // [ METHOD ]: Add node to the beginning
    prepend(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

      // [ METHOD ]: Remove node by value
      remove(value) {
        if (!this.head) return;

        if (this.head.value === value) {
            this.head = this.head.next;
            this.size--;
            return;
        }

        let current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }

        if (current.next) {
            current.next = current.next.next;
            this.size--;
        }
    }

    // [ METHOD ]: Display all nodes
    print() {
        let current = this.head;
        let result = "";

        while (current) {
          result += current.value + " -> ";
          current = current.next;
        } console.log(result + "null");
    }

    diagnose(tree, answers) {
      let node = tree;

      for (let answer of answers) {
        if (answer === "yes" && node.yes) {
          node = node.yes;
        } else if (answer === "no" && node.no) {
          node = node.no;
        }
      } return node.disease || "Unknown";
    }

  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

export default LinkedList;