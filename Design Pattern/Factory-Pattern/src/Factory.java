public class Factory implements SensorFactory{

    @Override
    public MotionSensor createMotionSensor() {
      return new MotionSensor();
    }

    @Override
    public SmokeSensor createSmokeSensor() {
       return new SmokeSensor();
    }
    
}
