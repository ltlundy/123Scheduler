import React from 'react'
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

const docks = [
    {
        name: 'Dock 1',
        trailers: [new Trailer('Van', 'van', 'van-utility', new Carrier('Dave', 1, new ELD(1, 1))), 
                new Trailer('Reefer', 'reefer', 'truck-cargo-container', new Carrier('John', 1, new ELD(1, 1))), 
                new Trailer('Flatbed', 'flatbed', 'truck-flatbed', new Carrier('Joe', 1, new ELD(1, 1))), 
            ],
        nextAvailable: 1,
    },
    {
        name: 'Dock 2',
        trailers: [new Trailer('Van', 'van', 'van-utility', new Carrier('Max', 1, new ELD(1, 1)))],
        nextAvailable: 1,
    },
    {
        name: 'Dock 3',
        trailers: [new Trailer('Van', 'van', 'van-utility', new Carrier('Dave', 1, new ELD(1, 1))),
                new Trailer('Flatbed', 'flatbed', 'truck-flatbed', new Carrier('Joe', 1, new ELD(1, 1))), 
            ],
        nextAvailable: 1,
    },
];

const totalTrailers = [new Trailer('Van', 'van', 'van-utility', new Carrier('Dave', 1, new ELD(1, 1))), 
                        new Trailer('Reefer', 'reefer', 'truck-cargo-container', new Carrier('John', 1, new ELD(1, 1))), 
                        new Trailer('Flatbed', 'flatbed', 'truck-flatbed', new Carrier('Joe', 1, new ELD(1, 1))),
                        new Trailer('Van', 'van', 'van-utility', new Carrier('Max', 1, new ELD(1, 1))),
                        new Trailer('Reefer', 'reefer', 'truck-cargo-container', new Carrier('MaxTwo', 1, new ELD(1, 1))), 
                        new Trailer('Flatbed', 'flatbed', 'truck-flatbed', new Carrier('MaxThree', 1, new ELD(1, 1))), 
]


function LoadingDocks() {
    const [dockVisible, setDockVisible] = React.useState(false);
    const [selectedDock, setSelectedDock] = React.useState(docks[0]);

    const AddTrailersList = () => {
        return (
          <ScrollView>
            {totalTrailers.map((u, i) => {
                return (
                    <View
                        key={i}
                        style={[styles.allTrailers, styles.shadowProp, {backgroundColor: dockHasTrailer(u) ? 'grey' : 'white'}]}
                    >
                        <View style={styles.availableText}>
                            <View style={styles.row}>
                            <MaterialCommunityIcons style={{marginRight: 10}} name={`${u.icon}`} size={26}/>  
                            <Text style={styles.name}>{u.carrier.name}'s {u.name}</Text>  
                            </View>
                            <TouchableScale
                            style={[styles.row, styles.scheduleButton]}
                            onPress={() => {
                                console.log(u);
                                if (!dockHasTrailer(u)) {
                                    console.log(selectedDock)
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
                totalTrailers={totalTrailers}
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
                {docks.map((u, i) => {
                return (
                    <TouchableScale
                        key={i}
                        style={[styles.dock, styles.shadowProp]}
                        onPress={() => {
                            console.log(u);
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                            setSelectedDock(u);
                            setDockVisible(true);
                        }}
                        activeScale={0.98}
                    >
                        <MaterialCommunityIcons name="office-building" size={26}/>
                        <View style={styles.cardText}>
                            <Text style={styles.dockName}>{u.name.toUpperCase()}</Text>
                            <Text style={styles.waitTime}>Next Available: 1h</Text>
                        </View>
                    </TouchableScale>
                );
            })}
            </ScrollView>
            <View style={{ height: 370, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '800', margin: 10, color: '#02B528' }}>AVAILABLE</Text>
                <AddTrailersList selectedDock={selectedDock} totalTrailers={totalTrailers} />
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