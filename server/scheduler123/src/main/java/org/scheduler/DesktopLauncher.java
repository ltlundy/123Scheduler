package org.scheduler;

import org.springframework.beans.factory.annotation.Autowired;

public class DesktopLauncher {

    @Autowired
    static Scheduler scheduler;
    public static void main(String[] args) {
        DataGenerator gen = new DataGenerator(10);
        System.out.println(gen.outputData());
        System.out.println(gen.outputData().get(0).getCarrier().workTimeRemaining());
        Scheduler scheduler = new Scheduler();
        scheduler.setShipper(new Shipper(4));
        scheduler.addTrailers(gen.outputData());
        System.out.println(scheduler.getShipper());
        System.out.println(scheduler.waitTimes().values());
        scheduler.getNotScheduled().forEach(t->System.out.println(t));

    }
}