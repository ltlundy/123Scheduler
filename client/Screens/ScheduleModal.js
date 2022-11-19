import React from 'react'
import { View, ScrollView, StyleSheet, Image, Modal, Pressable, Text } from 'react-native'


function ScheduleModal(props) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.scheduleVisible}
            onRequestClose={() => {
                props.setModalVisible(!props.scheduleVisible);
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>{props.selectedSchedule.name}</Text>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => props.setScheduleVisible(!props.scheduleVisible)}
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        width: '80%',
        height: '70%',
        margin: 20,
        backgroundColor: "#ebebeb",
        borderRadius: 20,
        padding: 35,
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
      button: {
        borderRadius: 4,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        backgroundColor: "#595959",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});

export default ScheduleModal