import React from 'react'
import { View, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';


function Carriers() {
    const [startDate, setStartDate] = React.useState(new Date(1598051730000));
    const [endDate, setEndDate] = React.useState(new Date(1598051730000));
    const [mode, setMode] = React.useState('time');

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
            <Text style={{ fontWeight: 'bold', fontSize: 24, margin: 10 }}>Set Working Hours</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '90%' }}>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Text>Start Time</Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={startDate}
                        mode={mode}
                        is24Hour={true}
                        onChange={onStartChange}
                    />
                </View>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Text>End Time</Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={endDate}
                        mode={mode}
                        is24Hour={true}
                        onChange={onEndChange}
                    />
                </View>
            </View>
        </View>
    )
}

export default Carriers