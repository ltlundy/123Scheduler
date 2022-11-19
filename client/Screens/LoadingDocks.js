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
    return (
        <View style={{height: 750}} >
            <LoadingModal 
                selectedDock={selectedDock}
                setSelectedDock={setSelectedDock}
                dockVisible={dockVisible}
                setDockVisible={setDockVisible}
                totalTrailers={totalTrailers}
            />
            <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Text>Docks</Text>
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
                        <MaterialCommunityIcons name="calendar-clock" size={26}/>
                        <View style={styles.cardText}>
                            <Text style={styles.name}>{u.name}</Text>
                            <View style={[styles.row, {width: 70}]}>
                                <MaterialCommunityIcons name="truck-cargo-container" size={26}/>
                                <Text style={styles.waitTime}>{u.waitTime}</Text>
                            </View>
                        </View>
                    </TouchableScale>
                );
            })}
            </ScrollView>
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
        justifyContent: 'space-between',
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
    image: {
      width: 30,
      height: 30,
      marginRight: 10,
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