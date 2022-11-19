package org.scheduler;

public abstract class Trailer {

    private int load; // LBS

    private final int loadCapacity;

    private final Carrier carrier;

    private double timePerLbs;

    private double plannedArrivalTime; // Time of day

    private double scheduledUnloadTime; // Time of day scheduled to unload


    public double getPlannedArrivalTime() {
        return plannedArrivalTime;
    }

    public void setPlannedArrivalTime(double plannedArrivalTime) {
        if (plannedArrivalTime < 0) throw new IllegalArgumentException("Arrival Time must be positive");
        this.plannedArrivalTime = plannedArrivalTime;
    }


    public Trailer(int load, int loadCapacity, Carrier carrier, double timePerLbs) {
        if (loadCapacity < 0 || load < 0) throw new IllegalArgumentException("Load and capacity must be positive");
        else if (timePerLbs < 0) throw new IllegalArgumentException("Time to unload must be positive");
        this.load = load;
        this.loadCapacity = loadCapacity;
        this.carrier = carrier;
        this.timePerLbs = timePerLbs;
    }

    public Trailer(int loadCapacity, Carrier carrier) {
        if (loadCapacity < 0) throw new IllegalArgumentException("Load capacity must be positive");
        this.loadCapacity = loadCapacity;
        this.carrier = carrier;
    }

    public Carrier getCarrier() {
        return carrier;
    }

    public void setLoad(int Load, Double time) {
        if (Load < 0 || time < 0) {
            throw new IllegalArgumentException("Load and time must both be non-negative");
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

    public void setScheduledtime(double time) {
        if (time < 0) throw new IllegalArgumentException("Time must not be negative");
        scheduledUnloadTime = time;
    }

    public double getSchduledtime() {
        return scheduledUnloadTime;
    }
}
