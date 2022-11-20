package org.scheduler;

import java.util.ArrayList;
import java.util.Random;

public class DataGenerator {
    public ArrayList<Trailer> data = new ArrayList<>();
    private final Random rn = new Random();
    private String[] nameList = {"John", "Becky", "Johnny", "Sam", "Vivek", "Liam", "Richard", "Jane", "Alexa", "Alex",
            "Ingrid", "Charles", "Nikki", "Chris", "Ines", "Sammy", "Tom", "Isaac", "Ghandi", "Ewan", "Obiwan Kenobi", "Cassian Andor",
            "Ben Solo", "Han Solo", "Luke Skywalker", "R2D2", "Fork", "Jim", "Toby", "Al", "Joe", "Brandon", "Donald", "Justin",
            "Chen", "Hacker", "Hunter", "Amber", "Toro", "Trevor", "Michael", "Tony", "Drew"};

    public DataGenerator(Integer ptestAmount) {
        generateTestData(ptestAmount);
    }

    public void generateTestData(Integer pTestAmount) {
        for (int i = 0; i < pTestAmount; i++) {
            Carrier Ctemp = new Carrier(nameList[rn.nextInt(nameList.length)], rn.nextInt(100));
            Ctemp.processWorkTime(rn.nextDouble()*11);

            Trailer Ttemp = new Flatbed(rn.nextInt(500) + 500, 1000, Ctemp, 0.004 * rn.nextDouble() + 0.001);
            Ttemp.setPlannedArrivalTime(rn.nextDouble()*12.0 + 8);


            data.add(Ttemp);
        }
    }

    public ArrayList<Trailer> outputData() {
        return new ArrayList<Trailer>(data);
    }



}
