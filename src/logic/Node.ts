interface INode<T> {
    value: T;
    next: INode<T> | null;
}

class Node<T> implements INode<T> {
    value: T;
    next: INode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export default Node;