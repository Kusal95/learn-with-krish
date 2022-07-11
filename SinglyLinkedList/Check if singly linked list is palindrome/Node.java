public class Node<T> {

    public Node<T> next;
    public T data;

    Node(T data) {
        this.data = data;
        this.next = null;
    }
}
