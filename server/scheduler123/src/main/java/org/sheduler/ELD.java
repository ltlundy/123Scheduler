package org.sheduler;

public class ELD {
    //Electronic Logging Device
    // Used to monitor Hours of Service of a Carrier

    private double hoursOfService;
    private double maxHours;

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
