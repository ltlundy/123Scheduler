import React from 'react'
import { View, ScrollView, StyleSheet, Image, Modal, Pressable, Text } from 'react-native'
import TouchableScale from 'react-native-touchable-scale';
import MapView, { Marker } from 'react-native-maps';
import * as Haptics from 'expo-haptics';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';


function LoadingModal(props) {
  const [key, setKey] = React.useState(1);
  const [mapRegion, setmapRegion] = React.useState({
    latitude: 45.501690,
    longitude: -73.567253,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const CurrentTrailersList = (props) => {
    return (
      <ScrollView contentContainerStyle={{ height: 300 }}>
                {props.selectedDock.trailers.map((u, i) => {
                    return (
                        <TouchableScale
                            key={i}
                            style={[styles.dock, styles.shadowProp]}
                            onPress={() => {
                                console.log(u);
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                            }}
                            activeScale={0.98}
                        >
                            <View style={styles.cardText}>
                              <View style={styles.row}>
                                <MaterialCommunityIcons name={`${u.icon}`} size={26}/>  
                                <Text style={styles.name}>{u.carrier.name}'s {u.name}</Text>  
                              </View>
                              <View style={styles.row}>
                                <Text>{u.carrier.ELD.hoursOfService}h (Max {u.carrier.ELD.maxHours}h)</Text> 
                              </View>
                            </View>
                        </TouchableScale>
                      );
                })}
        </ScrollView>
    )
  }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.dockVisible}
            onRequestClose={() => {
                props.setModalVisible(!props.dockVisible);
            }}
        >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{props.selectedDock.name.toUpperCase()}</Text>
                <CurrentTrailersList selectedDock={props.selectedDock} />
                <MapView
                  style={{ alignSelf: 'center', height: '40%', marginBottom: 20, borderRadius: 10, width: '90%' }}
                  region={mapRegion}
                >
                  <View style={styles.mapOverlayTime}>
                    <Text style={{ fontWeight: 'bold', margin: 7 }}>
                      Est. Arrival Time: 1h
                    </Text>
                  </View>
                  <Marker coordinate={mapRegion} title={`${props.selectedDock.name}`} />
                </MapView>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => props.setDockVisible(!props.dockVisible)}
                >
                  <Text style={styles.textStyle}>Done</Text>
                </Pressable>
              </View>
            </View>
        </Modal>
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
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: {
        width: '90%',
        height: '70%',
        margin: 20,
        backgroundColor: "#ebebeb",
        borderRadius: 20,
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 12,
        paddingRight: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      scroll: {
        alignItems: "center",
      },
      button: {
        borderRadius: 4,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        backgroundColor: '#FF9700',
        width: '90%',
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      name: {
        fontWeight: "bold",
        marginLeft: 10,
      },
      modalTitle: {
        marginBottom: 15,
        fontSize: 30,
        textAlign: "center",
        fontWeight: '700',
      },
      mapOverlayTime: {
        backgroundColor: 'white',
        width: '50%',
        height: 30,
        borderRadius: '0 10 10 10',
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      cardText: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        paddingLeft: 10,
        paddingRight: 10,
    },
      dock: {
        flexDirection: 'row',
        marginBottom: 6,
        borderRadius: 4,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 8,
        width: '100%',
      },
     allTrailers: {
        flexDirection: 'row',
        marginBottom: 6,
        borderRadius: 4,
        paddingTop: 11,
        paddingBottom: 11,
        paddingLeft: 8,
        width: '100%',
      },
      shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: "#FFF",
    },
});

export default LoadingModal