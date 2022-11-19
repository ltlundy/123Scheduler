package org.scheduler;

import java.util.*;

public class Scheduler {

    //Singleton Design Pattern

    private static final Scheduler Instance = new Scheduler();
    private final ArrayList<Trailer> trailers;


    private final ArrayList<Trailer> notScheduled;
    private Shipper shipper;

    private Scheduler() {
        trailers = new ArrayList<Trailer>();
        notScheduled = new ArrayList<Trailer>();
    }



    // Return single Scheduler instance
    public static Scheduler instance() {
        return Instance;
    }

    // Only adding trailer, sorting
    public void addTrailer(Trailer t){
        // Method to add a single trailer
        trailers.add(t);
        scheduleTrailer(t);
    }

    public void addTrailers(List<Trailer> ts) {
        // Method to add multiple trailers
        trailers.addAll(ts);
        scheduleTrailers(ts);
    }

    private void scheduleTrailers(List<Trailer> ts) {
        // Will sort trailers before adding them
        ts.sort(Comparator.comparing(Trailer::getPlannedArrivalTime)
                .thenComparing(t -> t.getCarrier().workTimeRemaining()));
        ts.forEach(this::scheduleTrailer);
    }

    public void redoSchedule() {
        // Clears all the loading docks
        Arrays.stream(shipper.docks()).forEach(LoadingDock::clear);
        // Will Schedule all the trailers
        notScheduled.clear();
        scheduleTrailers(trailers);
    }

    private void scheduleTrailer(Trailer t) {
        boolean scheduled = false;
        // Tries to see if trailer can be added to each loading dock immediately
        for (LoadingDock d : shipper.docks()) {
            if (t.getPlannedArrivalTime() > d.getNextTimeAvailable()) {
                // Schedules Truck if it can be added immediately only if there is enough time
                if (t.getCarrier().processWorkTime(t.timeToUnload())) {
                    d.add(t);
                    t.setScheduledtime(d.getNextTimeAvailable());
                    d.setNextTimeAvailable(t.getPlannedArrivalTime() + t.timeToUnload());
                    return;
                }
            }
        }

            // If it cant be scheduled right away then will add to first available slot
            LoadingDock toAdd = Arrays.stream(shipper.docks()).reduce((d1, d2) -> (d2.getNextTimeAvailable() > d1.getNextTimeAvailable()) ? d1 : d2).get();
            // Check if the truck can be scheduled
            double waitTime = toAdd.getNextTimeAvailable() - t.getPlannedArrivalTime();
            // If is able to be scheduled will be, will add wait time
            if (t.getCarrier().processWorkTime(waitTime + t.timeToUnload())) {
                toAdd.add(t);
                t.setScheduledtime(toAdd.getNextTimeAvailable());
                toAdd.setNextTimeAvailable(t.timeToUnload() + toAdd.getNextTimeAvailable());
                t.getCarrier().setWaitTime(waitTime);
            }
            else {
                notScheduled.add(t);
            }


    }

    public HashMap<Carrier, Double> waitTimes() {
        HashMap<Carrier, Double> map = new HashMap<>();
        trailers.forEach(t -> {
            if (!notScheduled.contains(t)) {
                map.put(t.getCarrier(), t.getCarrier().getWaitTime());
            }
            else map.put(t.getCarrier(), -1.00);
        });
        return map;
    }


    public Shipper getShipper() {
        return shipper;
    }

    public void setShipper(Shipper shipper) {
        this.shipper = shipper;
    }



    public ArrayList<Trailer> getNotScheduled() {
        return new ArrayList<>(notScheduled);
    }
}
