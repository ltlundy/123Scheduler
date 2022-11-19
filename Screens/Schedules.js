import React from 'react'
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native'
import TouchableScale from 'react-native-touchable-scale';
import * as Haptics from 'expo-haptics';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

const schedules = [
    {
        name: 'Schedule1',
        waitTime: '4h',
    },
    {
        name: 'Schedule2',
        waitTime: '4.8h',
    },
    {
        name: 'Schedule3',
        waitTime: '1h',
    },
    {
        name: 'Schedule4',
        waitTime: '4h',
    },
    {
        name: 'Schedule1',
        waitTime: '4h',
    },
    {
        name: 'Schedule2',
        waitTime: '4.8h',
    },
    {
        name: 'Schedule3',
        waitTime: '1h',
    },
    {
        name: 'Schedule4',
        waitTime: '4h',
    },
    {
        name: 'Schedule1',
        waitTime: '4h',
    },
    {
        name: 'Schedule2',
        waitTime: '4.8h',
    },
    {
        name: 'Schedule3',
        waitTime: '1h',
    },
    {
        name: 'Schedule4',
        waitTime: '4h',
    },
    {
        name: 'Schedule1',
        waitTime: '4h',
    },
    {
        name: 'Schedule2',
        waitTime: '4.8h',
    },
    {
        name: 'Schedule3',
        waitTime: '1h',
    },
    {
        name: 'Schedule4',
        waitTime: '4h',
    },
];


function Schedules() {
    return (
        <View style={{height: 750}} >
            <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Text>Schedules</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                {schedules.map((u, i) => {
                return (
                    <TouchableScale
                        key={i}
                        style={[styles.schedule, styles.shadowProp]}
                        onPress={() => {
                            console.log('hi');
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        }}
                        activeScale={0.98}
                    >
                        <MaterialCommunityIcons name="calendar-clock" size={26}/>
                        <View style={styles.cardText}>
                            <Text style={styles.name}>{u.name}</Text>
                            <Text style={styles.waitTime}>{u.waitTime}</Text>
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
    schedule: {
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

export default Schedules