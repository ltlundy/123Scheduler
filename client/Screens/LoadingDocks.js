import React, { useEffect } from 'react'
import { View, ScrollView, StyleSheet, Image, Modal, Pressable, Text } from 'react-native'
import TouchableScale from 'react-native-touchable-scale';
import * as Haptics from 'expo-haptics';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingModal from './LoadingModal';

class Trailer {
    constructor(name, type, icon, carrier) {
      this.name = name;
      this.type = type;
      this.icon = icon;
      this.carrier = carrier;
    }
  }
  
  class Carrier {
    constructor(name, DOTNum, ELD) {
      this.name = name;
      this.DOTNum = DOTNum;
      this.ELD = ELD;
    }
  }
  
  class ELD {
    constructor(hoursOfService, maxHours) {
      this.hoursOfService = hoursOfService;
      this.maxHours = maxHours;
    }
  }

const sampleDocks = [
    {
        trailers: [
            new Trailer('Flatbed', 
                'flatbed', 'truck-flatbed',
                new Carrier("Ines", 0.0, new ELD(8.575190872931701, 8.575190872931701))),
            new Trailer('Flatbed', 
                'flatbed', 'truck-flatbed',
                new Carrier("Sam", 0.0, new ELD(11.941675757893885, 11.941675757893885))),
        ],
    }
];

const sampleCarriers = [
    {"dotnum": 97, "name": "Ewan", "waitTime": 0},
    {"dotnum": 63, "name": "Chris", "waitTime": 0},
    {"dotnum": 69, "name": "Richard", "waitTime": 0},
    {"dotnum": 10, "name": "Charles", "waitTime": 0},
    {"dotnum": 97, "name": "John", "waitTime": 0},
    {"dotnum": 94, "name": "Donald", "waitTime": 0},
    {"dotnum": 87, "name": "Ines", "waitTime": 0},
    {"dotnum": 35, "name": "Sam", "waitTime": 0},
    {"dotnum": 27, "name": "Trevor", "waitTime": 0},
    {"dotnum": 34, "name": "Jane", "waitTime": 0}
];

const icons = [
    {name: 'Van', icon: 'van-utility'},
    {name: 'Reefer', icon: 'truck-cargo-container'},
    {name: 'Flatbed', icon: 'truck-flatbed'},
]


function LoadingDocks() {
    const [dockVisible, setDockVisible] = React.useState(false);
    const [key, setKey] = React.useState(1);
    const [selectedDock, setSelectedDock] = React.useState(sampleDocks[0]);
    const [loadingDocks, setLoadingDocks] = React.useState(sampleDocks);
    const [carriers, setCarriers] = React.useState(sampleCarriers);
    const [idx, setIdx] = React.useState(0);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        console.log(getSchedules());
        console.log(getCarriers());
        setKey(Math.random());
    }
  
    async function getSchedules() {
      const response = await fetch(
        'http://172.20.10.3:8080/schedule/shipper/docks',
        {}
      ).then((data) => data.json())
      .then(json => {
        console.log(json);
        let docks = [];
        json.forEach((dock, i) => {
          let carriers = []
          dock.forEach(carrier => {
            let trailer = new Trailer('Flatbed', 
            'flatbed', 'truck-flatbed',
             new Carrier(carrier.carrier.name, carrier.carrier.waitTime, new ELD(carrier.carrier.plannedArrivalTime, carrier.carrier.schduledtime)));
             carriers.push(trailer);
          })
          docks.push({
            trailers: carriers,
          });
          setSelectedDock(docks[0]);
          setLoadingDocks(docks);
          console.log("Selected dock", selectedDock);
          console.log("Docks", loadingDocks);
          setKey(Math.random());
        })
      });
    }

    async function getCarriers() {
        const response = await fetch(
          'http://172.20.10.3:8080/schedule/carriers',
          {}
        ).then((data) => data.json())
        .then(json => {
          console.log("Carrier", json);
          setCarriers(carriers);
          setKey(Math.random());
        });
      }

      async function scheduleTrailer(trailer) {
        const response = await fetch(
            fetch('http://172.20.10.3:8080/scheduler/trailer', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    loadCapacity: 2,
                    carrier: trailer,
                })
                })
          ).then((data) => console.log(data))
          .catch(err => console.log(err));
      }

    const AddTrailersList = () => {
        return (
          <ScrollView>
            {carriers.map((u, i) => {
                let icon = icons[i % 3];
                return (
                    <View
                        key={i}
                        style={[styles.allTrailers, styles.shadowProp, {backgroundColor: dockHasTrailer(u) ? 'grey' : 'white'}]}
                    >
                        <View style={styles.availableText}>
                            <View style={styles.row}>
                            <MaterialCommunityIcons style={{marginRight: 10}} name={`${icon.icon}`} size={26}/>  
                            <Text style={styles.name}>{u.name}'s {icon.name}</Text>  
                            </View>
                            <TouchableScale
                            style={[styles.row, styles.scheduleButton]}
                            onPress={() => {
                                if (!dockHasTrailer(u)) {
                                    console.log("Adding trailer", u);
                                    scheduleTrailer(u);
                                }
                            }}
                            activeScale={0.90}
                            >
                                <MaterialCommunityIcons name={'plus'} size={22} style={{ color: 'white' }}/>
                                <Text style={{ color: 'white', fontWeight: '700' }}>SCHEDULE</Text>
                            </TouchableScale>
                        </View>
                    </View>
                    );
            })}
            </ScrollView>
        )
      }
      
      const dockHasTrailer = (trailer) => {
        return selectedDock.trailers.includes(trailer);
      }


    return (
        <View style={{height: 770, }} >
            <LoadingModal 
                selectedDock={selectedDock}
                setSelectedDock={setSelectedDock}
                dockVisible={dockVisible}
                setDockVisible={setDockVisible}
                totalTrailers={loadingDocks}
                idx={idx}
            />
            <View style={{ marginTop: 40, marginLeft: 14, marginRight: 14, height: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <Image
                    style={{ width: 150, height: 40, }}
                    source={require('../assets/SCHEDULER.png')}
                />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22, color: '#FF9700' }}>/</Text>
                <Text style={{ color: 'white', fontWeight: '800', fontSize: 21, color: '#FF9700' }}>LOADING DOCKS</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                {loadingDocks.map((u, i) => {
                let randomSchedule = (Math.random() * (24) + 1).toString().match(/^-?\d+(?:\.\d{0,1})?/)[0];
                return (
                    <TouchableScale
                        key={i}
                        style={[styles.dock, styles.shadowProp]}
                        onPress={() => {
                            console.log(u);
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                            setSelectedDock(u);
                            setIdx(i);
                            setDockVisible(true);
                        }}
                        activeScale={0.98}
                    >
                        <MaterialCommunityIcons name="office-building" size={26}/>
                        <View style={styles.cardText}>
                            <Text style={styles.dockName}>MTL Example {i}</Text>
                            <Text style={styles.waitTime}>Next: {randomSchedule}h</Text>
                        </View>
                    </TouchableScale>
                );
            })}
            </ScrollView>
            <View style={{ height: 370, paddingLeft: '5%', paddingRight: '5%' }}>
                <View style={styles.row}>
                    <Text style={{ fontSize: 20, fontWeight: '800', margin: 10, color: '#02B528' }}>AVAILABLE</Text>
                    <TouchableScale 
                        style={{backgroundColor: '#FF9700', borderRadius: 4, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}
                        onClick={() => {
                            console.log("Rescheduled");
                        }}
                    >
                        <MaterialCommunityIcons name="calendar-refresh" size={19} style={{ margin: 4, 'color': 'white' }}/>
                        <Text style={{ fontSize: 16, fontWeight: '800', margin: 4, color: 'white' }}>RESCHEDULE</Text>
                    </TouchableScale>
                </View>
                <AddTrailersList selectedDock={selectedDock} totalTrailers={loadingDocks} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center', 
        justifyContent:'center',
    },
    fonts: {
        marginBottom: 8,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    scheduleButton: {
        backgroundColor: '#02B528',
        borderRadius: 2,
        padding: 8,
    },
    allTrailers: {
        flexDirection: 'row',
        marginBottom: 6,
        borderRadius: 4,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 8,
        width: '100%',
    },
    dock: {
      flexDirection: 'row',
      marginBottom: 6,
      borderRadius: 4,
      paddingTop: 25,
      paddingBottom: 25,
      paddingLeft: 14,
      width: '90%',
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: "#FFF",
    },
    cardText: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    availableText: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        width: '90%'
    },
    image: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    dockName: {
        fontSize: 18,
        marginTop: 4,
        fontWeight: 'bold',
    },
    name: {
      fontSize: 16,
      marginTop: 5,
      fontWeight: 'bold',
    },
    waitTime: {
        fontSize: 16,
        marginTop: 5,
    },
});

export default LoadingDocks