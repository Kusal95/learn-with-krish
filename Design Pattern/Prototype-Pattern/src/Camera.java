public class Camera implements Prototype{

    private String brand;
    private String model;
    private String type;
    private String sensor;
    private String resolution;
    private String storage;
    private boolean flash;
    private boolean LCDDispaly;


    public Camera(String brand, String model, String type, String sensor, String resolution, String storage, boolean flash, boolean LCDDispaly) {
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.sensor = sensor;
        this.resolution = resolution;
        this.storage = storage;
        this.flash = flash;
        this.LCDDispaly = LCDDispaly;
    }

    @Override
    public Camera clone() {
        return new Camera(brand, model, type, sensor, resolution, storage, flash, LCDDispaly);
    }

    public String getSensor() {
        return sensor;
    }

    public void setSensor(String sensor) {
        this.sensor = sensor;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public String getStorage() {
        return storage;
    }

    public void setStorage(String storage) {
        this.storage = storage;
    }

    public boolean isFlash() {
        return flash;
    }

    public void setFlash(boolean flash) {
        this.flash = flash;
    }

    public boolean isLCDDispaly() {
        return LCDDispaly;
    }

    public void setLCDDispaly(boolean LCDDispaly) {
        this.LCDDispaly = LCDDispaly;
    }

    @Override
    public String toString() {
        return "Camera{" +
                "brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", type='" + type + '\'' +
                ", sensor='" + sensor + '\'' +
                ", resolution='" + resolution + '\'' +
                ", storage='" + storage + '\'' +
                ", flash=" + flash +
                ", LCDDispaly=" + LCDDispaly +
                '}';
    }
}