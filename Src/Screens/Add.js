import React,{useState} from 'react'
import {View,Text,StyleSheet,ScrollView,ToastAndroid, TextInput,Pressable} from 'react-native'
import {Container,Button} from 'native-base' 
import AsyncStorage from '@react-native-async-storage/async-storage';
import shortid from 'shortid';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
const Add = ({navigation}) => {
 const [Name,setName] = useState('');
 const [Hours,setHours] = useState('');

 const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //   console.warn("A date has been picked: ", date);
      setHours( moment(date).format('hh:mm A'))
    hideDatePicker();
  };

  const changeit = () => {
    let color =
      'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')';

    return color;
  };
 const  addShedule = async () => {
   try {
     if (!Name || !Hours) {
       return alert('Please add both fields')
     }

const SheduleToAdd =  {
  id:shortid.generate(),
  Name,
  Hours,
  isComplete:false,
  color:changeit()
  
}

const storedValue = await AsyncStorage.getItem("@shedule_list")
const prevList = await JSON.parse(storedValue)

if (!prevList) {
  const newList = [SheduleToAdd]
  await AsyncStorage.setItem("@shedule_list",JSON.stringify(newList))
  
}else{
  prevList.push(SheduleToAdd)
  await AsyncStorage.setItem("@shedule_list",JSON.stringify(prevList))
}
navigation.navigate('Home')

   } catch (error) {
     console.log(error)
   }
 }
return (
 <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:'space-evenly'}}>
<Text style={Styles.heading}>Add your Task</Text>
<View>
<View style={{backgroundColor:'#fff',marginHorizontal:20,elevation:2,flexDirection:'row',alignItems:'center'}}>
  <MaterialIcons name="add-task" size={25} style={{marginLeft:10}}/>
  <TextInput placeholder="Enter tasks" style={{marginLeft:5}} value={Name} onChangeText={(name)=>setName(name)}/>
</View>
<View style={{backgroundColor:'#fff',marginHorizontal:20,elevation:2,marginTop:20,flexDirection:'row',alignItems:'center'}}>
<Pressable onPress={()=>{
      showDatePicker();
      
    }} style={Styles.inputtext} >
          <Ionicons name="time-outline" size={25}  />
          <Text style={{marginLeft:5}}>{Hours ? Hours : 'Time'}</Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={moment().subtract(13, 'years')._d}
      />
    </Pressable>
</View>
</View>

    <Button  block
    onPress={addShedule}
    style={{marginHorizontal:110,paddingVertical:10}}
    >
    <Text style={{paddingVertical:5}}>Add</Text>
    </Button>
</ScrollView>

)}
const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'flex-start',
      },
      heading: {
        textAlign: 'center',
        color: '#00b7c2',
        marginHorizontal: 5,
        marginTop: 50,
        marginBottom: 20,
        fontSize:30
      },
      formItem: {
        marginBottom: 20,
      },
      inputtext: {
        flexDirection:'row',
        alignItems:'center',
        textAlignVertical:'center',
        
        padding: 10,
        
        width:'100%'
      
      },
})

export default Add;