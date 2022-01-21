import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import data from '../data.json';

var monthh = -1;

export default function Screen2() {
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(data.information);
    },[]);
    
    function monthName(date) {
        const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        
        var content = date;     //"2020-11-23"
        var temp = content.split("-");
    
        const d = new Date(temp[0], temp[1], temp[2]);
        return monthNames[d.getMonth()] + " " + temp[0];
    }

    function monthShortName(date) {
        const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        
        var content = date;
        var temp = content.split("-");
        const d = new Date(temp[0], temp[1], temp[2]);
        return monthShortNames[d.getMonth()];
    }

    function dATE(date) {

        var temp = date.split("-");
        return temp[2];
    }

    function numberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function checkMonths(date){
        var temp = date.split("-");
        var mon = temp[1];
        if(monthh !== -1){
            if(monthh === mon){
                return true;
            }
            else{
                monthh = mon;
                return false;
            }
        }
        else{
            monthh = mon
            return false;
        }
    }

    if(list.length === 0){
        return(
            <View>
                <Text>Loading</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={(item) => item.date}
                data={list}
                renderItem={({item}) => (
                    isTrue = checkMonths(item.date),
                    <View style={isTrue ? (styles.cardList2) : (styles.cardList1) }>

                        <View style={isTrue ? (styles.heading) : (styles.hideHeading) }>

                            <Text style={styles.head}>{monthName(item.date)}</Text>
                        </View>

                        <View style={styles.bottom}>
    
                            <View style={styles.dateAndMonth}>
                                <Text style={{fontWeight:'bold', color:'rgb(180, 180, 180)'}}>{monthShortName(item.date)}</Text>
                                <Text style={{fontWeight:'bold', color:'rgb(180, 180, 180)'}}>{dATE(item.date)}</Text>
                            </View>

                            <View style={{justifyContent:'center',alignItems:'center',width:40, height:40, backgroundColor:"#E5890A", borderRadius:50, marginRight:15}}>
                            <MaterialIcons name={item.logo} size={24} color="white" />
                            </View>

                                <View style={styles.desc}>

                                    <View style={{flexDirection:'column'}}>
                                        <Text style={styles.itemDesc}>{item.description}</Text>
                                        <Text style={{color:'rgb(180, 180, 180)', fontWeight:'bold', fontStyle:'italic'}}>Paid by {item.paid_by}</Text>
                                    </View>
                                </View>
    
                                <View style={{width:80, alignItems:'flex-end'}}>
                                    {
                                        item.paid_by === "you" ? <Text style={styles.money}>+ ₹{numberWithCommas(item.amount)}</Text> : <Text style={styles.money2}>- ₹{numberWithCommas(item.amount)}</Text>
                                    }
                                </View>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    
    container: {
        flex:1,
        marginTop:-110,
        width:'100%',
    },

    cardList1: {
        backgroundColor:'rgb(66,66,66)',
        marginTop:7,
        borderBottomWidth: 2,
        borderColor:'rgb(90, 90, 90)'
    },
    cardList2: {
        backgroundColor:'rgb(66,66,66)',
        borderBottomWidth: 3,
        borderColor:'rgb(83, 83, 83)'
    },
    bottom: {
        flexDirection:'row',
        marginTop:15,
        marginBottom:10,
        alignItems:'center'
    },
    heading: {
        display:'none',
        marginLeft:15
    },
    hideHeading: {
        marginTop:15,
        marginLeft:15
    },
    head: {
        fontSize:15,
        fontWeight:'bold',
        textTransform:'uppercase',
        color:'rgb(180, 180, 180)'
    },
    dateAndMonth: {
        flexDirection:'column',
        marginLeft:15,
        marginRight:15
    },
    desc: {
        width:182,
        flexDirection:'row'
    },
    itemDesc: {
        textTransform: 'capitalize',
        fontSize:20,
        fontWeight:'bold',
        marginBottom:3,
        color: 'rgb(255, 218, 51)'
    },
    money: {
        fontSize:20,
        fontWeight:'bold',
        color:'#6ECB63',
    },
    money2: {
        fontSize:20,
        fontWeight:'bold',
        color:'tomato'
    }
})