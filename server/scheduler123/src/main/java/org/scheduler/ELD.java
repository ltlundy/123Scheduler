package org.scheduler;

public class ELD {
    //Electronic Logging Device
    // Used to monitor Hours of Service of a Carrier

    private double hoursOfService; // Total Hours
    private double maxHours; // Total hours

    public ELD(double hoursOfService, double maxHours) {
        this.hoursOfService = hoursOfService;
        this.maxHours = maxHours;
    }

    public double getHoursOfService() {
        return hoursOfService;
    }

    public void setHoursOfService(double hoursOfService) {
        this.hoursOfService = hoursOfService;
    }

    public double getMaxHours() {
        return maxHours;
    }

    public void setMaxHours(double maxHours) {
        this.maxHours = maxHours;
    }
}
