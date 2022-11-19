package org.scheduler;

public class Shipper {
    //An individual or company that has a load/freight that needs to be shipped.

    private final LoadingDock[] docks;

    public Shipper(int loadingDocks) {
        // Initializes new shipper based on number of loading docks
        this.docks = new LoadingDock[loadingDocks];
    }

    public LoadingDock[] docks() {
        // Method that returns loading docks
        return docks;
    }
}
