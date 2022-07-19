public class PrototypeDemo {
    public static void main(String[] args) {
        //create a camera object
        Camera cameraOne=new Camera("Canon","60D","DSLR","22.3 x 14.9 mm CMOS","5184 × 3456 pixels","64GB",true,true);
        //print cameraOne Object specs
        System.out.println(cameraOne.toString());

        //create a camera object clone
        Camera cameraTwo=cameraOne.clone();
        //change the specs
        cameraTwo.setModel("80D");
        cameraTwo.setResolution("6000 x 4000 pixels");
        //print cameraTwo object specs
        System.out.println(cameraTwo);
    }
}
