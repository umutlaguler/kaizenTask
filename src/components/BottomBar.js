import { 
    FlatList, 
    Image, 
    StyleSheet, 
    TouchableOpacity, 
    View,
    Text
} from 'react-native';
import React from 'react';
import { PhoneHeight, PhoneWidth } from '../constants/config';
// import { icons } from '../constants';
import { useNavigation } from '@react-navigation/native';

export default function BottomBar() {

  return (
    <View style = {styles.bottomBarContainer}>
        <View style = {styles.buttonsView}>
            <TouchableOpacity style = {styles.bottomButtons}>
                <Image 
                    style = {{width: 25, height: 25}}
                    source={require('../assets/icons/kesfet.png')}
                />
                <Text style = {{marginTop: 5}}>KEŞFET</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.centerButton}>
                <Image 
                    style = {{width: '100%', height: '100%'}}
                    source={require('../assets/icons/portal.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.bottomButtons}>
                <Image 
                    style = {{width: 25, height: 25}}
                    source={require('../assets/icons/dahaCuzdan.png')}
                />
                <Text style = {{marginTop: 5}}>DAHA CÜZDAN</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    bottomBarContainer: {
        
        height: PhoneHeight * 0.1,
        flexDirection: "row",
        justifyContent: "center",
    },
    buttonsView: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
        borderColor: '#ECEEEF',

        flexDirection: "row",
        alignItems: 'center',
        justifyContent:'center',
        // borderWidth: 1,
        // width: PhoneWidth,
        height: PhoneHeight * 0.1,
    },
    bottomButtons: {
        // borderWidth: 1, 
        width: '40%',
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    centerButton: {
        // borderWidth: 1, 
        width: '20%',
        borderRadius: 30,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: PhoneHeight * 0.05,
    }
})  