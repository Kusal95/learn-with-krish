public class MotionSensor implements Sensor {

    private final String DESCRIPTION = "Motion Sensor created by factory";
    private final String ALERT_MSG = "Motion Detected";

    @Override
    public String getDescription() {
        return DESCRIPTION;
    }

    @Override
    public void detect() {
        System.out.println(ALERT_MSG);
    }


}
