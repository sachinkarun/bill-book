import React, { Component } from 'react'
import { View,Text } from 'react-native'
import data from './data.json'

export class Example3 extends Component {
    constructor(props){
        super(props);
        this.state = {
            total: 0,
            list:[],
        }
    }

    componentDidMount(){
        this.setState({list: data.information})
    }

    render() {
        return (
            <View>
            {this.state.list.map(item => (
            <View key={item.date}>
              <Text>{item.paid_by}</Text>
            </View>
          ))}
            </View>
        )
    }
}

export default Example3
