public class SinglyLinkedListDemo {
    public static void main(String[] args) {
        SinglyLinkedList<Integer> list = new SinglyLinkedList<>();
        for (int i = 0; i < 10; i++) {
            list.insertAfter(i);
        }

        System.out.println("Linked List:");
        list.print();
        list.reverse();
        System.out.println("\nReversed Linked List:");
        list.print();
    }
}
