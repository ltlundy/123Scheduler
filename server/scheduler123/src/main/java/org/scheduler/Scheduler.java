package org.scheduler;

import java.util.ArrayList;

public class Scheduler {

    //Singleton Design Pattern

    private static final Scheduler Instance = new Scheduler();
    private final ArrayList<Trailer> trailers;
    private Shipper shipper;

    private Scheduler() {
        trailers = new ArrayList<Trailer>();
    }

    public Shipper getShipper() {
        return shipper;
    }

    public void setShipper(Shipper shipper) {
        this.shipper = shipper;
    }

    // Return single Scheduler instance
    public static Scheduler instance() {
        return Instance;
    }

    // Only adding trailer, sorting
    public void addTrailer(Trailer t){
        trailers.add(t);
    }



}
