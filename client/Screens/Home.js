import React, { useEffect } from 'react'
import { View, ScrollView, StyleSheet, Image, Modal, Pressable, Text, TextInput } from 'react-native'
import TouchableScale from 'react-native-touchable-scale';
import * as Haptics from 'expo-haptics';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingModal from './LoadingModal';



function Home() {
    return (
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <View style={{ height: 370, paddingLeft: '5%', paddingRight: '5%' }}>
                <View style={styles.row}>
                    <Text style={{ fontSize: 30, fontWeight: '800', margin: 10, color: '#02B528' }}>WELCOME</Text>
                </View>
                <TouchableScale 
                        style={{backgroundColor: '#FF9700', borderRadius: 4, margin: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}
                        onClick={() => {
                            console.log("Broker");
                        }}
                    >
                        <MaterialCommunityIcons name="truck-cargo-container" size={19} style={{ margin: 4, 'color': 'white' }}/>
                        <Text style={{ fontSize: 20, fontWeight: '800', margin: 4, color: 'white' }}>BROKER</Text>
                    </TouchableScale>
                    <TouchableScale 
                        style={{backgroundColor: '#FF9700', borderRadius: 4, margin: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}
                        onClick={() => {
                            console.log("Broker");
                        }}
                    >
                        <MaterialCommunityIcons name="human-male-board" size={19} style={{ margin: 4, 'color': 'white' }}/>
                        <Text style={{ fontSize: 20, fontWeight: '800', margin: 4, color: 'white' }}>CARRIER</Text>
                    </TouchableScale>
                    <TextInput style={styles.input} onChangeText={(e) => console.log(e.target.value)} value={'username'} />
                    <TextInput style={styles.input} onChangeText={(e) => console.log(e.target.value)} value={'password'} />
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
    input: {
        height: 40,
        margin: 10,
        borderWidth: 0.5,
        borderRadius: 4,
        borderColor: 'grey',
        padding: 10,
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

export default Home