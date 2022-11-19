package org.scheduler;

import java.util.LinkedList;
import java.util.List;

public class LoadingDock {
    //Class representing loading dock
    private final LinkedList<Trailer> Trailers;


    private double nextTimeAvailable = 0;

    public LoadingDock(List<Trailer> trailers) {
        Trailers = (LinkedList<Trailer>) trailers;
    }

    public LoadingDock() {
        Trailers = new LinkedList<>();
    }

    public double getNextTimeAvailable() {
        return nextTimeAvailable;
    }

    public void setNextTimeAvailable(double nextTimeAvailable) {
        this.nextTimeAvailable = nextTimeAvailable;
    }

    public void add(Trailer t){
        Trailers.add(t);
    }

    public void clear() {
        Trailers.clear();
    }

    public LinkedList<Trailer> trailers() {
        return new LinkedList<Trailer>(Trailers);
    }
}
