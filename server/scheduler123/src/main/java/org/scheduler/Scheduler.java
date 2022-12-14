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
        // HardCoded Data
        shipper = new Shipper(4);
        DataGenerator gen = new DataGenerator(10);
        addTrailers(gen.outputData());
    }


    /*
     * @param Trailer t to be added
     */

    @PostMapping("scheduler/trailer")
    public void addTrailer(@RequestBody Trailer t){
        // Method to add a single trailer
        trailers.add(t);
        scheduleTrailer(t);
    }

    /*
    * @param DOTnum, department of transportation number of the carrier
    * @return Carrier
     */
    @GetMapping("scheduler/carrier/{DOTnum}")
    public Carrier getCarrier(@PathVariable("DOTnum") int DOTnum) {
        for (Trailer t : trailers) {
            if (t.getCarrier().getDOTnum() == DOTnum) {
                return t.getCarrier();
            }
        }
        return null;
    }

    @GetMapping("scheduler/trailer/{trailer}")
    public Trailer getTrailer(@PathVariable("trailer") int DOTnum) {
        for (Trailer t : trailers) {
            if (t.getCarrier().getDOTnum() == DOTnum) {
                return t;
            }
        }
        return null;
    }

    @DeleteMapping("scheduler/trailer/{trailer}")
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

    @PutMapping("schedule/redo")
    public void redoSchedule() {
        // Clears all the loading docks
        Arrays.stream(shipper.docks()).forEach(LoadingDock::clear);
        // Will Schedule all the trailers
        notScheduled.clear();
        scheduleTrailers(trailers);
    }

    private void scheduleTrailer(Trailer t) {
        // Tries to see if trailer can be added to each loading dock immediately
        for (LoadingDock d : shipper.docks()) {
            if (t.getPlannedArrivalTime() >= d.getNextTimeAvailable()) {
                // Schedules Truck if it can be added immediately only if there is enough time
                if (t.getCarrier().enoughTime(t.timeToUnload())) {
                    d.add(t);
                    t.setScheduledtime(t.getPlannedArrivalTime());
                    d.setNextTimeAvailable(t.getPlannedArrivalTime() + t.timeToUnload());
                }
                else {
                    // If it cant be scheduled then will add to the not scheduled list
                    notScheduled.add(t);
                }
                return;
            }
        }
        // If it cant be scheduled right away then will add to first available slot
        LoadingDock toAdd = Arrays.stream(shipper.docks()).reduce((d1, d2) -> (d2.getNextTimeAvailable() > d1.getNextTimeAvailable()) ? d1 : d2).get();
        // Check if the truck can be scheduled
        double waitTime = toAdd.getNextTimeAvailable() - t.getPlannedArrivalTime();
        // If is able to be scheduled will be, will add wait time
        if (t.getCarrier().enoughTime(waitTime + t.timeToUnload())) {
            toAdd.add(t);
            t.setScheduledtime(toAdd.getNextTimeAvailable());
            toAdd.setNextTimeAvailable(t.timeToUnload() + toAdd.getNextTimeAvailable());
            t.getCarrier().setWaitTime(waitTime);
        } else {
            // If cannot be scheduled
            notScheduled.add(t);
        }

    }


    @PutMapping("scheduler/times/{carrier}")
    public void setWorkTime(@PathVariable("carrier") String name, @RequestParam("time") double time) {
        for (Trailer t : trailers) {
            if (t.getCarrier().getName().equalsIgnoreCase(name)) t.getCarrier().setWorkTime(time);
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


    @GetMapping("schedule/test")
    public String test(){
        return "Test";
    }

    @GetMapping("schedule/shipper")
    public Shipper getShipper() {
        return shipper;
    }

    @PostMapping ("schedule/shipper")
    public void setShipper(@RequestBody Shipper shipper) {
        this.shipper = shipper;
    }


    @GetMapping("schedule/shipper/docks")
    public LinkedList[] docks(){
        LoadingDock[] docks = shipper.docks();
        LinkedList<Trailer>[] output = new LinkedList[docks.length];
        for (int i=0; i<docks.length; i++) {
            output[i] = docks[i].trailers();
        }
        return output;
    }

    @GetMapping("schedule/shipper/docks/{id}")
    public List<Trailer> dockNum(@PathVariable("id") int id){
        return shipper.docks()[id].trailers();
    }

    @GetMapping("schedule/notScheduled")
    public ArrayList<Trailer> getNotScheduled() {
        return new ArrayList<>(notScheduled);
    }

    @GetMapping("schedule/carriers")
    public Object[] getCarriers(){
        return trailers.stream().map(Trailer::getCarrier).toArray();
    }

    @GetMapping("schedule/trailers")
    public Object[] getTrailers(){
        return trailers.toArray();
    }
}
