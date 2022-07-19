package ConcreteDecorator;

import Decorator.BaseTopping;
import component.BaseJuice;

public class CashewNuts extends BaseTopping {

    public CashewNuts(BaseJuice baseJuice) {
        super(baseJuice);
    }

    @Override
    public String getDescription() {
        return super.getDescription()+"cashew nuts";
    }

    @Override
    public double getPrice() {
        return super.getPrice()+10.00;
    }
}