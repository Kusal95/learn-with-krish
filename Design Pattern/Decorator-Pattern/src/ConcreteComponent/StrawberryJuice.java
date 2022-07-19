package ConcreteComponent;

import component.BaseJuice;

public class StrawberryJuice extends BaseJuice {

    @Override
    public String getDescription() {
        return "Strawberry Juice";
    }

    @Override
    public double getPrice() {
        return 200.00;
    }

}
