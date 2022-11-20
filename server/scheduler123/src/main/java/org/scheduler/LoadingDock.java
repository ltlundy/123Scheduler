package org.scheduler;

import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;

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

    public void remove(Trailer t) {
        Trailers.remove(t);
    }

    public LinkedList<Trailer> trailers() {
        return new LinkedList<Trailer>(Trailers);
    }

    @Override
    public String toString() {
        try {
            return trailers().stream()
                    .map(t -> "Trailer: " + t.getCarrier().getName() + " Scheduled time " + t.getSchduledtime() + '\t')
                    .reduce((s1, s2) -> s1 + s2)
                    .get();
        } catch (NoSuchElementException e) {
            return "Empty Dock";
        }


    }
}
