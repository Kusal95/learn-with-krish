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

    public boolean isPalindrome() {
        Node<T> currentHead = head;
        reverse();
        Node<T> reversedHead=head;
        boolean isPalindrome=false;

        int mid;
        if (size % 2 == 0) {
            mid = size / 2;
        } else {
            mid = (size + 1) / 2;
        }

        for(int i=1; i<mid;i++){
            if(currentHead.data==reversedHead.data){
                isPalindrome=true;
            }else{
                break;
            }
        }

        return isPalindrome;
    }


    public void print() {
        Node<T> currentNode = head;
        while (currentNode != null) {
            System.out.print(currentNode.data + " ");
            currentNode = currentNode.next;
        }
    }

    public int size() {
        return size;
    }
}
