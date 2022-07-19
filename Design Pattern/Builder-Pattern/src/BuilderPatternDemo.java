public class BuilderPatternDemo {
    public static void main(String[] args) {
        Desktop.DesktopBuilder builder = new Desktop.DesktopBuilder(
                "Asus",
                "",
                "Intel(R) Core(TM) i3-4170U CPU @ 3.70GHz ",
                "Asus H81 Motherboard",
                "8GB DDR3",
                "Intel HD 4400",
                "250W PSU",
                "Seagate 1TB HDD");

        Desktop desktop = builder.build();

        System.out.println("Specification : "+ desktop.getBrand()+"\n"
                + desktop.getProcessor()+"\n"
                + desktop.getMotherboard()+"\n"
                +desktop.getMemory()+"\n"
                +desktop.getStorage()+"\n"
                +desktop.getPowerSupply());
    }
}
