package org.scheduler;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class Scheduler {

    //Singleton Design Pattern


    private final ArrayList<Trailer> trailers;


    private final ArrayList<Trailer> notScheduled;
    private Shipper shipper;

    public Scheduler() {
        trailers = new ArrayList<Trailer>();
        notScheduled = new ArrayList<Trailer>();
    }


    /*
    @param Trailer t to be added
     */

    @PostMapping("Scheduler/Trailer/{trailer}")
    public void addTrailer(@PathVariable("trailer") Trailer t){
        // Method to add a single trailer
        trailers.add(t);
        scheduleTrailer(t);
    }

    @GetMapping("Scheduler/Carrier/{carrier}")
    public Carrier getCarrier(@PathVariable("carrier") int carrier) {
        for (Trailer t : trailers) {
            if (t.getCarrier().getDOTnum() == carrier) {
                return t.getCarrier();
            }
        }
        return null;
    }

    @GetMapping("Scheduler/Trailer/{trailer}")
    public Trailer getTrailer(@PathVariable("trailer") int DOTnum) {
        for (Trailer t : trailers) {
            if (t.getCarrier().getDOTnum() == DOTnum) {
                return t;
            }
        }
        return null;
    }

    @DeleteMapping("Scheduler/Trailer/{trailer}")
    public void removeTrailer(@PathVariable("trailer") Trailer t) {
        notScheduled.remove(t);
        trailers.remove(t);
        for (int i=0;i<shipper.docks().length; i++) {
            shipper.docks()[0].remove(t);
        }
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
                    t.setScheduledtime(t.getPlannedArrivalTime());
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

    

    @GetMapping("Schedule/Shipper")
    public Shipper getShipper() {
        return shipper;
    }

    @PutMapping("Schedule/Shipper")
    public void setShipper(Shipper shipper) {
        this.shipper = shipper;
    }



    @GetMapping("Schedule/notScheduled")
    public ArrayList<Trailer> getNotScheduled() {
        return new ArrayList<>(notScheduled);
    }
}
