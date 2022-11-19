package org.scheduler;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Random;

public class DataGenerator {
    public ArrayList<Trailer> data = new ArrayList<>();
    private final Random rn = new Random();

    public DataGenerator(Integer ptestAmount) {
        generateTestData(ptestAmount);
    }

    public void generateTestData(Integer pTestAmount) {
        for (int i = 0; i < pTestAmount; i++) {
            Carrier temp = new Carrier(Integer.toString(i), rn.nextInt(100));
            temp.processWorkTime(rn.nextDouble());
            data.add(new Flatbed(rn.nextInt(1000) + 1, 1000, temp, 0.2 * rn.nextDouble()));
        }
    }

    public ArrayList<Trailer> outputData() {
        return new ArrayList<Trailer>(data);
    }



}
