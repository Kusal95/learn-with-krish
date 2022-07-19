package Decorator;

import component.BaseJuice;

public class BaseTopping extends BaseJuice {

    private final BaseJuice baseJuice;

    public BaseTopping(BaseJuice baseJuice) {
        this.baseJuice = baseJuice;
    }


    @Override
    public String getDescription() {
        return baseJuice.getDescription()+" with ";
    }

    @Override
    public double getPrice() {
        return baseJuice.getPrice();
    }
}
