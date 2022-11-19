package org.scheduler;

public class Flatbed extends Trailer{
    public Flatbed(int load, int loadCapacity, Carrier carrier, double timePerLbs) {
        super(load, loadCapacity, carrier, timePerLbs);
    }
    // A trailer that consists of only a deck, uses tarp to cover goods
}
