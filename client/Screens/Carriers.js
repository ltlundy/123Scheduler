import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect } from 'react'
import { View, ScrollView, StyleSheet, Image, Modal, Pressable, Text } from 'react-native'
import TouchableScale from 'react-native-touchable-scale';
import * as Haptics from 'expo-haptics';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingModal from './LoadingModal';

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

function Carriers() {
    const [startDate, setStartDate] = React.useState(new Date(1598051730000));
    const [endDate, setEndDate] = React.useState(new Date(1598051730000));
    const [mode, setMode] = React.useState('time');
    const [key, setKey] = React.useState(1);
    const [carriers, setCarriers] = React.useState(sampleCarriers);

    useEffect(() => {
        fetchData();
        setKey(Math.random());
    }, [])

    const fetchData = () => {
        console.log(getCarriers());
        setKey(Math.random());
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

    const onStartChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setStartDate(currentDate);
    };

    const onEndChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setEndDate(currentDate);
    };

    return (
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, marginTop: 100, marginBottom: 20 }}>Carrier Working Hours</Text>
            <ScrollView>
            {carriers.map((u, i) => {
                let icon = icons[i % 3];
                return (
                    <View
                        key={i}
                        style={[styles.allTrailers, styles.shadowProp, {backgroundColor: 'white'}]}
                    >
                        <View style={styles.availableText}>
                            <View style={styles.row}>
                            <MaterialCommunityIcons style={{marginRight: 10}} name={`${icon.icon}`} size={26}/>  
                            <Text style={styles.name}>{u.name}</Text>  
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '50%' }}>
                            <View style={{alignItems:'center', justifyContent:'center'}}>
                                <Text>Start Time</Text>
                                <DateTimePicker
                                    testID={`dateTimePicker2${i}`}
                                    value={startDate}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onStartChange}
                                />
                            </View>
                            <View style={{alignItems:'center', justifyContent:'center'}}>
                                <Text>End Time</Text>
                                <DateTimePicker
                                    testID={`dateTimePicker2${i}`}
                                    value={endDate}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onEndChange}
                                />
                            </View>
                        </View>
                        </View>
                    </View>
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

export default Carriers