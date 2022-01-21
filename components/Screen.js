import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import data from '../data.json';
import logo from './logo.png';

export default function Screen({show}) {
    const [list, setList] = useState([]);
    const [you, setYou] = React.useState(0);
    const [jacob, setJacob] = React.useState(0);
    const [total, setTotal] = React.useState(0);

  useEffect(() => {
    setList(data.information);
    var personOne = 0;
    var personTwo = 0;
    list.map(item => {
      if(item.paid_by === 'you'){
        personOne = personOne + item.amount;
      }
      else{
        personTwo = personTwo + item.amount;
      }
    })

    setYou(personOne);
    setJacob(personTwo);
    if(personOne > personTwo){
      setTotal(personOne - personTwo)
    }
    else{
      setTotal(personTwo - personOne)
    }
  })

  function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  if(you === 0 || jacob === 0 || total === 0){
    return(
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  return (
    <View>
      <View style={styles.header}>
      <Image source={logo} style={{ width: 45, height: 45, borderRadius:50 }} />

      <Text style={show ? (styles.nameDark) : (styles.name)}>Jacob Richards</Text>
        <TouchableOpacity>
          <FontAwesome name="search" style={styles.search} size={24} color={show ? "white" : "black" } />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" style={styles.dots} size={24} color={show ? "white" : "black" } />
        </TouchableOpacity>
      </View>

      <View
        style={you > jacob ? (styles.greencard) : (styles.redcard)}>
        <Text style={{color: 'rgba(253, 253, 253, 0.678)'}}>TOTAL PAYABLE</Text>
        <Text style={styles.price}>₹ {numberWithCommas(total)}</Text>
      </View>

        {you > jacob ? (
      <TouchableOpacity style={styles.button1}>
          <Text style={styles.pay}>Get credit</Text>
          </TouchableOpacity>
          ):(
            <TouchableOpacity style={styles.button2}>
            <Text style={styles.pay}>Settle up</Text>
        </TouchableOpacity>
        )}
    </View>
  )
}

const styles = StyleSheet.create({

  header: {
    marginTop:20,
    width:350,
    flexDirection:'row',
    alignItems:'center',
  },
  name: {
    marginLeft:10,
    fontSize:23,
    fontWeight:'bold',
    color:'black'
  },
  nameDark: {
    marginLeft:10,
    fontSize:23,
    fontWeight:'bold',
    color:'white'
  },
  search: {
    marginLeft:70,
  },
  dots: {
    marginLeft:20,
  },
  greencard: {
    backgroundColor:"#1C7947",
    marginTop:15,
    height: '37%',
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center',
  },
  redcard: {
    backgroundColor:"tomato",
    marginTop:15,
    height: '37%',
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center',
  },
  price:{
    color:'white',
    fontWeight:'bold',
    fontSize:40
  },
  button1: {
    backgroundColor:'tomato',
    height:50,
    borderRadius:30,
    marginTop:20,
    alignItems:'center',
    justifyContent:'center',
  },
  button2: {
    backgroundColor:'#1C7947',
    height:50,
    borderRadius:30,
    marginTop:20,
    alignItems:'center',
    justifyContent:'center',
  },
  pay:{
    color:'white',
    fontSize:18,
    fontWeight:'bold'
  }
});
