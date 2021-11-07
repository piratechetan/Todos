import React,{useState} from 'react'
import {View,StyleSheet,ScrollView,Image,Text} from 'react-native'
import {Container,Spinner,Checkbox,Fab} from 'native-base'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import {useIsFocused} from '@react-navigation/native'

import logo from '../Assets/empty.png';

const Home = ({navigation,route}) => {
 const [listofShedule,setlistofShedule]=useState([
 ]);
 const [loading,setLoading] = useState(false)
const isFocused = useIsFocused();

const getList = async () => {
  setLoading(true)

  const storedValue = await AsyncStorage.getItem('@shedule_list')

  if(!storedValue) {
    setlistofShedule([])
    setLoading(false)
  }else{
    const list = JSON.parse(storedValue)
 setlistofShedule(list)
 setLoading(false)
  }
 

}

const deleteShedlue = async (id) => {
  const newList =  listofShedule.filter((list)=>list.id !== id)
  await AsyncStorage.setItem('@shedule_list',JSON.stringify(newList))
  setlistofShedule(newList)
}

const markComplete = async (id) => {
  const newArr = listofShedule.map((list)=>{
    if(list.id==id){
      list.isComplete = !list.isComplete
    }
    return list
  })

  await AsyncStorage.setItem('@shedule_list',JSON.stringify(newArr))
  setlistofShedule(newArr)
}

useEffect(() => {
  getList();
},[isFocused])

if(loading){
  return(
    <View style={Styles.container}>
     <Spinner color="#00b7c2"/>
    </View>
  )
}

return (
<ScrollView contentContainerStyle={Styles.container}>
   {listofShedule.length == 0 ? (
<View style={{alignItems:'center',justifyContent:'center',flex:1}}>
  <Image source={logo} style={{width:150,height:150,alignSelf:'center'}}/>
<Text style={Styles.emptyheading}>No More Tasks Add one</Text>
</View>
   ) : (
     <>
     <Text style={Styles.heading}>To Do Tasks</Text>
    <View>
    {
      listofShedule.map(item => {
        console.log(item)
        return(
            <View key={item.id}>
              <View>
                <View style={{backgroundColor:'#fff',marginHorizontal:15,elevation:2,flexDirection:'row',alignItems:'center',marginTop:15,padding:10,justifyContent:'space-between'}}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                  <View style={{backgroundColor:item.color,width:5,height:40,marginRight:15,borderRadius:10}}/>
                 <Checkbox value="test" accessibilityLabel="This is a dummy checkbox"  isChecked={item.isComplete} onChange={()=>markComplete(item.id)} colorScheme={item.color}/>
                <View style={{marginLeft:15}}>
                <Text style={{fontSize:20,color:'#000',textDecorationLine:item.isComplete ? 'line-through': undefined}}>{item.Name}</Text>
                <Text style={{fontSize:13,color:'#000'}}>{item.Hours}</Text>
                </View>
                  
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                  <MaterialIcons name="edit" size={25} style={{marginLeft:10}} onPress={() => {
                                navigation.navigate('Edit', {item})
                            }}/>
                <MaterialCommunityIcons name="delete" size={25} style={{marginLeft:10}} color="#d11a2a" onPress={() => deleteShedlue(item.id)}/>
                </View>
                </View>
                
                <View>
                  <View>
  
                  </View>
                </View>
              </View>
            </View>
          )
        
      })
    }
            
    </View>
    
    </>
    
   )}
   {
     isFocused ?
     <Fab
      placement='bottom-right'
      colorScheme="blue"
      onPress={() => navigation.navigate('Add')}
      style={{marginRight:10,marginBottom:20,backgroundColor:"#00b7c2"}}
      size="lg"
      icon={<Entypo name="plus" size={25} color={'#fff'}/>}
    /> : null
   }
       

</ScrollView>
)}
const Styles = StyleSheet.create({
    emptyContainer: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
        backgroundColor: '#fff',
        flex: 1,
      },
      heading: {
        textAlign: 'center',
        color: '#00b7c2',
        marginVertical: 30,
        marginHorizontal: 5,
        fontSize:30
      },
      emptyheading: {
        textAlign: 'center',
        color: '#00b7c2',
        marginVertical: 30,
        marginHorizontal: 5,
        fontSize:20
      },
      actionButton: {
        marginLeft: 5,
      },
      seasonName: {
        color: '#fdcb9e',
        textAlign: 'justify',
      },
      listItem: {
        marginLeft: 0,
        marginBottom: 20,
      },
})
export default Home;