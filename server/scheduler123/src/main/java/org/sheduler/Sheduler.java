package org.sheduler;

import java.util.ArrayList;

public class Sheduler {

    //Singelton Design Pattern

    private static final Sheduler Instance = new Sheduler();
    private final ArrayList<Trailer> trailers;

    public Shipper getShipper() {
        return shipper;
    }

    public void setShipper(Shipper shipper) {
        this.shipper = shipper;
    }

    private Shipper shipper;
    private Sheduler() {
        trailers = new ArrayList();
    }

    public static Sheduler instance() {
        return Instance;
    }

    public void addTrailer(Trailer t){
        trailers.add(t);
    }



}
