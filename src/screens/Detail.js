import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { fetchDetail } from '../actions/homeAction'
import { useDispatch, useSelector } from 'react-redux'
import { PhoneHeight, PhoneWidth } from '../constants/config'

export default function Detail(item) {
  const regex = /(<([^>]+)>)/ig;
  const idIncoming = item.route.params.Id
  const {detailedData} = useSelector(state => state.homeReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetail(idIncoming))
  }, [])

  return (
    <SafeAreaView style = {{flex: 1}}>
      <ScrollView style = {{flex: 1}}>
        <View style = {styles.photoBox}>
          <Image
            source={{
                uri: detailedData.ImageUrl,
            }}
            style = {styles.promotionPhoto}
          />
          <Image
            source={{
                uri: detailedData.BrandIconUrl,
            }}
            style = {styles.brandIconPhoto}
          />
        </View>
        <Text style = {styles.title}>{detailedData?.Title?.replace(regex, '')}</Text>
        <Text style = {styles.desc}>{detailedData?.Description?.replace(regex, '')}</Text>
      </ScrollView>
      <TouchableOpacity
        style = {styles.joinBtn}
      >
        <Text style = {styles.joinTxt}>{detailedData?.BrandPromotionCardParticipationText?.replace(regex, '')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  photoBox: {
    width: PhoneWidth,
    height: PhoneHeight * 0.4,
    justifyContent: 'flex-end'
  },
  promotionPhoto: {
    width: PhoneWidth,
    height: PhoneHeight * 0.4,
    borderBottomLeftRadius: 120,
  },
  brandIconPhoto: {
    width: 70,
    height: 70,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 100,
    position:'absolute'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 10
  },
  desc: {
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 10,
    fontWeight: '400',
    fontSize: 16
  },
  joinTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  joinBtn: {
    backgroundColor: 'red',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    width: PhoneWidth * 0.8,
    borderRadius: 30,
  }
})