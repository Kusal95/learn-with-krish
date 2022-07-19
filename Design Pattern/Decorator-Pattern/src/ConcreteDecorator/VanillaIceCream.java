package ConcreteDecorator;

import Decorator.BaseTopping;
import component.BaseJuice;

public class VanillaIceCream extends BaseTopping {

    public VanillaIceCream(BaseJuice baseJuice) {
        super(baseJuice);
    }

    @Override
    public String getDescription() {
        return super.getDescription()+"vanilla ice cream";
    }

    @Override
    public double getPrice() {
        return super.getPrice()+50.00;
    }
}