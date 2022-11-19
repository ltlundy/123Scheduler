package org.scheduler;

import java.util.ArrayList;

public class Scheduler {

    //Singelton Design Pattern

    private static final Scheduler Instance = new Scheduler();
    private final ArrayList<Trailer> trailers;

    public Shipper getShipper() {
        return shipper;
    }

    public void setShipper(Shipper shipper) {
        this.shipper = shipper;
    }

    private Shipper shipper;
    private Scheduler() {
        trailers = new ArrayList<Trailer>();
    }

    public static Scheduler instance() {
        return Instance;
    }

    public void addTrailer(Trailer t){
        trailers.add(t);
    }



}
