public class SmokeSensor implements Sensor {

    private final String DESCRIPTION = "Smoke Sensor created by factory";
    private final String ALERT_MSG = "Smoke Detected";

    @Override
    public String getDescription() {
        return DESCRIPTION;
    }

    @Override
    public void detect() {
        System.out.println(ALERT_MSG);
    }


}
