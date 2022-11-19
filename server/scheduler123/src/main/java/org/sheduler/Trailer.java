package org.sheduler;

public abstract class Trailer {

    private int load; // LBS

    private final int loadCapacity;

    private final Carrier carrier;

    private double timePerLbs;

    public double getPlannedArrivalTime() {
        return plannedArrivalTime;
    }

    public void setPlannedArrivalTime(double plannedArrivalTime) {
        this.plannedArrivalTime = plannedArrivalTime;
    }

    private double plannedArrivalTime;

    public Trailer(int load, int loadCapacity, Carrier carrier, double timePerLbs) {
        this.load = load;
        this.loadCapacity = loadCapacity;
        this.carrier = carrier;
        this.timePerLbs = timePerLbs;
    }

    public Trailer(int loadCapacity, Carrier carrier) {
        this.loadCapacity = loadCapacity;
        this.carrier = carrier;
    }

    public Carrier getCarrier() {
        return carrier;
    }

    public void setLoad(int Load, Double time) {
        if (Load < 0 || time < 0) {
            throw new IllegalArgumentException("Load and time must both be positive");
        }
        else if (Load > loadCapacity) {
            throw new IllegalArgumentException("Load Exceeds Capacity");
        }
        else {
            this.load = Load;
            this.timePerLbs = time;
        }
    }

    public double timeToUnload() {
        return load / timePerLbs;
    }
}
