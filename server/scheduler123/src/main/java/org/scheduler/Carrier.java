package org.scheduler;

public class Carrier {

    /*
    Carriers are truck drivers that often own their own truck and trailer. They look for loads to haul on load boards and deliver these loads to cities across Canada and USA.
     */

   private final String name;
   private final int DOTnum;
   private final ELD eld;

   private double waitTime = 0.00; // Not time of day

   private boolean active; // Whether the driver is currently on the job


   public Carrier(String name, int DOTnum) {
      if (name == null || name.equals("")) {
         throw new IllegalArgumentException("Name not valid");
      }
      this.name = name;
      this.DOTnum = DOTnum;
      eld = new ELD(0.00, 11);
      active = false;
   }

   public Carrier(String name, int DOTnum, ELD eld) {
      if ((eld == null) || name == null || name.equals("")) {
         throw new IllegalArgumentException("Name or ELD not valid");
      }
      this.name = name;
      this.DOTnum = DOTnum;
      this.eld = new ELD(eld.getHoursOfService(), eld.getMaxHours());
      active = false;
   }

   public String getName() {
      return name;
   }

   public int getDOTnum(){
      return DOTnum;
   }

   public double workTimeRemaining() {
      // Returns the amount of time remaining the driver has
      return eld.getMaxHours() - eld.getHoursOfService();
   }



   public boolean enoughTime(Double time) {
      // Takes amount of time and returns if the worker has enough work time remaining for that task
      if (time < 0) {
         throw new IllegalArgumentException("Time cannot be negative");
      }
      return workTimeRemaining() >= time;
   }

   public boolean processWorkTime(Double time) {
      // Adds amount of work time to time worked if there is enough time remaining, if not does nothing
      if (enoughTime(time)) {
         eld.setHoursOfService(eld.getHoursOfService() + time);
         return true;
      }
      else return false;
   }


   public double getWaitTime() {
      return waitTime;
   }

   public void setWaitTime(double waitTime) {
      this.waitTime = waitTime;
   }

   public String toString() {
      return this.name + " " + this.DOTnum;

   }

}
