public class Demo {
    public static void main(String[] args) {
        SinglyLinkedList<String> list = new SinglyLinkedList<>();
        list.insertAfter("R");
        list.insertAfter("A");
        list.insertAfter("C");
        list.insertAfter("E");
        list.insertAfter("C");
        list.insertAfter("A");
        list.insertAfter("R");
        System.out.println("Linked List:");
        list.print();
        System.out.println("\nList is a palindrome : " + list.isPalindrome());


        SinglyLinkedList<String> list2 = new SinglyLinkedList<>();
        list2.insertAfter("R");
        list2.insertAfter("A");
        list2.insertAfter("C");
        list2.insertAfter("E");
        System.out.println("Linked List:");
        list2.print();
        System.out.println("\nList is a palindrome : " + list2.isPalindrome());

        SinglyLinkedList<Integer> list3 = new SinglyLinkedList<>();
        list3.insertAfter(1);
        list3.insertAfter(2);
        list3.insertAfter(2);
        list3.insertAfter(1);
        System.out.println("Linked List:");
        list3.print();
        System.out.println("\nList is a palindrome : " + list3.isPalindrome());

        SinglyLinkedList<Integer> list4 = new SinglyLinkedList<>();
        list4.insertAfter(1);
        list4.insertAfter(2);
        list4.insertAfter(3);
        list4.insertAfter(4);
        System.out.println("Linked List:");
        list4.print();
        System.out.println("\nList is a palindrome : " + list4.isPalindrome());

    }


}
