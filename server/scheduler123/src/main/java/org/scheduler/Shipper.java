package org.scheduler;

import java.util.Arrays;

public class Shipper {
    //An individual or company that has a load/freight that needs to be shipped.

    private final LoadingDock[] docks;

    public Shipper(int loadingDocks) {
        // Initializes new shipper based on number of loading docks
        this.docks = new LoadingDock[loadingDocks];
        for (int i=0; i<docks.length; i++) {
            docks[i] = new LoadingDock();
        }
    }

    public LoadingDock[] docks() {
        // Method that returns loading docks
        return docks;
    }

    @Override
    public String toString() {
        // Returns a string represenation
        String output = "docks: \n";
        output += Arrays.stream(docks).map(LoadingDock::toString).reduce((s1, s2) -> s1 + '\n' + s2).get();
        return output;
    }
}
