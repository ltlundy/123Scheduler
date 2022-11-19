package org.scheduler;

import javax.xml.crypto.Data;

public class Main {
    public static void main(String[] args) {
        DataGenerator gen = new DataGenerator(1);
        System.out.println(gen.outputData());
        System.out.println(gen.outputData().get(0).getCarrier().workTimeRemaining());

    }
}