package org.sheduler;

public class Flatbed extends Trailer{
    public Flatbed(int load, int loadCapacity, Carrier carrier, int timePerLbs) {
        super(load, loadCapacity, carrier, timePerLbs);
    }
    // A trailer that consists of only a deck, uses tarp to cover goods
}
