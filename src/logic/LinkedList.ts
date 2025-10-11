import Node from "./Node";

interface ILinkedList<T> {
    head: Node<T> | null;
    size: number;
    append(value: T): void;
    prepend(value: T): void;
    remove(value: T): void;
    print(): void;
    diagnose(tree: IDecisionNode, answers: string[]): string;
    toArray(): T[];
}

interface IDecisionNode {
    yes?: IDecisionNode;
    no?: IDecisionNode;
    disease?: string;
}

class LinkedList<T> implements ILinkedList<T> {
    head: Node<T> | null;
    size: number;

    constructor(node?: Node<T>) {
        this.head = node || null;
        this.size = node ? 1 : 0;
    }

    append(value: T): void {
        const newNode = new Node<T>(value);

        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    prepend(value: T): void {
        const newNode = new Node<T>(value);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    remove(value: T): void {
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

    print(): void {
        let current = this.head;
        let result = "";

        while (current) {
            result += current.value + " -> ";
            current = current.next;
        }
        console.log(result + "null");
    }

    diagnose(tree: IDecisionNode, answers: string[]): string {
        let node = tree;

        for (let answer of answers) {
            if (answer === "yes" && node.yes) {
                node = node.yes;
            } else if (answer === "no" && node.no) {
                node = node.no;
            }
        }
        return node.disease || "Unknown";
    }

    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}

export default LinkedList;