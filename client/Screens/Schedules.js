import React from 'react'
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native'
import TouchableScale from 'react-native-touchable-scale';
import * as Haptics from 'expo-haptics';

const schedules = [
    {
        name: 'test1',
    },
    {
        name: 'test2',
    },
    {
        name: 'test3',
    },
    {
        name: 'test4',
    },
    {
        name: 'test1',
    },
    {
        name: 'test2',
    },
    {
        name: 'test3',
    },
    {
        name: 'test4',
    },
    {
        name: 'test1',
    },
    {
        name: 'test2',
    },
    {
        name: 'test3',
    },
    {
        name: 'test4',
    },
    {
        name: 'test1',
    },
    {
        name: 'test2',
    },
    {
        name: 'test3',
    },
    {
        name: 'test4',
    },
];


function Schedules() {
    return (
        <View style={{height: 600}} >
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
                        <Text style={styles.name}>{u.name}</Text>
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
      width: '90%',
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: "#FFF",
    },
    image: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    name: {
      fontSize: 16,
      marginTop: 5,
    },
});

export default Schedules