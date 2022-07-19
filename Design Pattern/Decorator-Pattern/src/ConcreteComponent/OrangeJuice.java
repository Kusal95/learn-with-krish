package ConcreteComponent;

import component.BaseJuice;

public class OrangeJuice extends BaseJuice {
    @Override
    public String getDescription() {
        return "Orange Juice";
    }

    @Override
    public double getPrice() {
        return 100.00;
    }

}