public class FactorypatternDemo {
    public static void main(String[] args) {
        SensorFactory sensorFactory=new Factory();
        //create a smoke sensor
        Sensor smokeSensor=sensorFactory.createSmokeSensor();
        //call detect method of SmokeSensor
        smokeSensor.detect();

        //create a MotionSensor
        Sensor motionSensor=sensorFactory.createMotionSensor();
        //call detect method of MotionSensor
        motionSensor.detect();

    }
}
