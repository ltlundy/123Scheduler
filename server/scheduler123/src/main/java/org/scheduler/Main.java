package org.scheduler;

import javax.xml.crypto.Data;

public class Main {
    public static void main(String[] args) {
        DataGenerator gen = new DataGenerator(10);
        System.out.println(gen.outputData());
        System.out.println(gen.outputData().get(0).getCarrier().workTimeRemaining());
        Scheduler scheduler = Scheduler.instance();
        scheduler.setShipper(new Shipper(4));
        scheduler.addTrailers(gen.outputData());
        System.out.println(scheduler.getShipper());
        System.out.println(scheduler.waitTimes().values());
        scheduler.getNotScheduled().forEach(t->System.out.println(t));

    }
}