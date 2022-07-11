public class SinglyLinkedList<T> {
    private Node<T> head, tail = null;
    private int size = 0;

    public void insertAfter(T data) {
        Node<T> newNode = new Node<T>(data);
        if (size == 0) {
            head = newNode;
            tail = newNode;
            head.next = null;
        } else {
            tail.next = newNode;
            tail = newNode;
            tail.next = null;
        }
        size++;
    }

    public void reverse() {

        if (size == 0) {
            return;
        }

        Node<T> previous = null;
        Node<T> current = head;

        while (current != null) {
            Node<T> next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }
        head = previous;

    }

    public void print() {
        Node<T> currentNode = head;
        while (currentNode != null) {
            System.out.print(currentNode.data + " ");
            currentNode = currentNode.next;
        }
    }
}
