public class Desktop {

    private String brand;
    private String model;
    private String processor;
    private String motherboard;
    private String memory;
    private String graphics;
    private String powerSupply;
    private String storage;

    public Desktop(DesktopBuilder desktopBuilder) {
        this.brand = desktopBuilder.brand;
        this.model = desktopBuilder.model;
        this.processor = desktopBuilder.processor;
        this.motherboard = desktopBuilder.motherboard;
        this.memory = desktopBuilder.memory;
        this.graphics = desktopBuilder.graphics;
        this.powerSupply = desktopBuilder.powerSupply;
        this.storage = desktopBuilder.storage;
    }

    public String getBrand() {
        return brand;
    }

    public String getModel() {
        return model;
    }

    public String getProcessor() {
        return processor;
    }

    public String getMotherboard() {
        return motherboard;
    }

    public String getMemory() {
        return memory;
    }

    public String getGraphics() {
        return graphics;
    }

    public String getPowerSupply() {
        return powerSupply;
    }

    public String getStorage() {
        return storage;
    }

    @Override
    public String toString() {
        return brand + " " + model + "\n"
                + processor + " Processor\n"
                + motherboard + " Motherboard\n"
                + memory + " Memory\n"
                + graphics + " Graphic Card\n"
                + powerSupply + " Power Supply\n"
                + storage + " Storage";

    }

    public static class DesktopBuilder {

        private String brand;
        private String model;
        private String processor;
        private String motherboard;
        private String memory;
        private String graphics;
        private String powerSupply;
        private String storage;

        public DesktopBuilder(String brand, String model, String processor, String motherboard, String memory, String graphics, String powerSupply, String storage) {
            this.brand = brand;
            this.model = model;
            this.processor = processor;
            this.motherboard = motherboard;
            this.memory = memory;
            this.graphics = graphics;
            this.powerSupply = powerSupply;
            this.storage = storage;
        }

        public Desktop build() {
            Desktop desktop = new Desktop(this);
            return desktop;
        }

        public void setBrand(String brand) {
            this.brand = brand;
        }

        public void setModel(String model) {
            this.model = model;
        }

        public void setProcessor(String processor) {
            this.processor = processor;
        }

        public void setMotherboard(String motherboard) {
            this.motherboard = motherboard;
        }

        public void setMemory(String memory) {
            this.memory = memory;
        }

        public void setGraphics(String graphics) {
            this.graphics = graphics;
        }

        public void setPowerSupply(String powerSupply) {
            this.powerSupply = powerSupply;
        }

        public void setStorage(String storage) {
            this.storage = storage;
        }

    }
}