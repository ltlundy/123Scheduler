package org.scheduler;

public class Van extends Trailer{

    public Van(int load, int loadCapacity, Carrier carrier, double timePerLbs) {
        super(load, loadCapacity, carrier, timePerLbs);
    }
}
