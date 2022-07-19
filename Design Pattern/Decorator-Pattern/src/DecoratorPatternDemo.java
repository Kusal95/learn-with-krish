import ConcreteComponent.OrangeJuice;
import ConcreteComponent.StrawberryJuice;
import ConcreteDecorator.CashewNuts;
import ConcreteDecorator.VanillaIceCream;
import component.BaseJuice;

public class DecoratorPatternDemo {
    public static void main(String[] args) {

        //creating an orange juice
        BaseJuice orangeJuice = new OrangeJuice();
        System.out.println("Created Juice : " + orangeJuice.getDescription() + " , Price : " + orangeJuice.getPrice());

        //Adding Vanila Ice Cream Topping
        orangeJuice = new VanillaIceCream(orangeJuice);
        System.out.println("After adding toppings : " + orangeJuice.getDescription() + " , Price : " + orangeJuice.getPrice());

        System.out.println("\n");

        //creating a strawberry juice
        BaseJuice straberryJuice = new StrawberryJuice();
        System.out.println("Created Juice : " + straberryJuice.getDescription() + " , Price : " + straberryJuice.getPrice());

        //Adding Vanila Ice Cream Topping and CashewNuts
        straberryJuice = new VanillaIceCream(straberryJuice);
        straberryJuice = new CashewNuts(straberryJuice);
        System.out.println("After adding toppings : " + straberryJuice.getDescription() + " Price : " + straberryJuice.getPrice());

    }
}
