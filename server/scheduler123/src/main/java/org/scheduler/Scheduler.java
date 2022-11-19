package org.scheduler;

import java.util.*;

public class Scheduler {

    //Singelton Design Pattern

    private static final Scheduler Instance = new Scheduler();
    private final ArrayList<Trailer> trailers;

    private final HashMap<Integer, LinkedList<Trailer>> schedule;


    private Shipper shipper;
    private Scheduler() {
        trailers = new ArrayList<Trailer>();
        schedule = new HashMap<>();
    }

    public static Scheduler instance() {
        return Instance;
    }

    public void addTrailer(Trailer t){
        trailers.add(t);
    }

    public void scheduleTrailers(List<Trailer> ts) {
        trailers.addAll(ts);
    }

    public void schedule() {
        //First Sorts trailers by arrival time then by the amount of time they have left
        trailers.sort(Comparator.comparing(Trailer::getPlannedArrivalTime)
                .thenComparing(t -> t.getCarrier().workTimeRemaining()));
        // Tries to add each trailer to the schedule
        for (Trailer t : trailers) {
            boolean scheduled = false;
            // Tries to see if trailer can be added to each loading dock immediately
            for (LoadingDock d : shipper.docks()) {
                if (t.getPlannedArrivalTime() > d.getNextTimeAvailable()) {
                    // Schedules Truck if it can be added immediately only if there is enough time
                    if (t.getCarrier().processWorkTime(t.timeToUnload())) {
                        d.add(t);
                        d.setNextTimeAvailable(t.getPlannedArrivalTime() + t.timeToUnload());
                        scheduled = true;
                        break;
                    }
                }
            }
            if (!scheduled) {
                // If it cant be scheduled right away then will add to first available slot
                LoadingDock toAdd = Arrays.stream(shipper.docks()).reduce((d1, d2) -> (d2.getNextTimeAvailable() > d1.getNextTimeAvailable()) ? d1 : d2).get();
                // Check if the truck can be scheduled
                double waitTime = toAdd.getNextTimeAvailable() - t.getPlannedArrivalTime();
                // If is able to be scheduled will be, will add wait time
                if (t.getCarrier().processWorkTime(waitTime + t.timeToUnload())) {
                    toAdd.add(t);
                    toAdd.setNextTimeAvailable(t.timeToUnload() + toAdd.getNextTimeAvailable());
                    t.getCarrier().setWaitTime(waitTime);
                }

            }
        }
    }

    public Shipper getShipper() {
        return shipper;
    }

    public void setShipper(Shipper shipper) {
        this.shipper = shipper;
    }



}
