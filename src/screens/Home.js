import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import BottomBar from '../components/BottomBar'
import { PhoneHeight, PhoneWidth } from '../constants/config'
import { fetchTags, fetchPromotion } from '../actions/homeAction'

export default function Home() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const regex = /(<([^>]+)>)/ig;
    const {tags, promotions} = useSelector(state => state.homeReducer)

    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredPromotions, setFilteredPromotions] = useState([]);

    useEffect(() => {
        dispatch(fetchTags())
        dispatch(fetchPromotion())
    }, [])

    const filterPromotions = () => {
        // searchText'e göre promotions'ları filtrele
        const filtered = promotions.filter(
          (promotion) =>
            promotion.Title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredPromotions(filtered);
      };
    
    useEffect(() => {
    // Her searchText değiştiğinde filtrelemeyi tetikle
    filterPromotions();
    }, [searchText]);

    const navigateToDetailScreen = (item) => {
        const SeoName = item.SeoName; //  SEO adı
        const Id = item.Id; //  ID
        navigation.navigate('Detail', { SeoName, Id });
    }

    const renderTags = ({item}) => {
        return(
            <TouchableOpacity style = {styles.tagBtn} >
                <Image
                    source={{
                        uri: item?.IconUrl,
                    }}
                    style = {styles.tagBrandLogo}
                />
                <Text>{item?.Name}</Text>
            </TouchableOpacity>
        )
    }
    const renderPromotions = ({item}) => {
        return(
            <View style={{...styles.promotionBox, borderColor: item.ListButtonTextBackGroudColor || 'blue'}}>
                <View style = {{justifyContent:'flex-end'}}>
                    <Image
                        source={{
                            uri: item.ImageUrl,
                        }}
                        style = {styles.promotionPhoto}
                    />
                    <Image
                        source={{
                            uri: item.BrandIconUrl,
                        }}
                        style = {styles.brandIconPhoto}
                    />
                </View>
                <View style= {{alignItems:'center', justifyContent:'center'}}>
                    <Text style = {{textAlign:'center', fontWeight:'bold', marginTop: 20 }}>{item.Title.replace(regex, '')}</Text>
                    <TouchableOpacity 
                        onPress={() => navigateToDetailScreen(item)}
                        style= {{marginTop: 20}}>
                        <Text style = {{color: item.ListButtonTextBackGroudColor, fontWeight: 'bold'}}>Daha Daha</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: '#FFF'}}>
            <SafeAreaView style = {{flex: 1}}>
                <View style = {styles.topContainer} >
                    <Image
                        source={require('../assets/images/dahaLogo.png')}
                        style = {styles.logo}
                    />
                    <View style = {{flexDirection: 'row', justifyContent:'space-between', borderWidth:0, width: PhoneWidth * 0.4}}>
                        <TouchableOpacity style = {styles.signInBtn}>
                            <Text style = {{color: '#fff', fontWeight: 'bold'}}> Giriş Yap </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.userBtn}>
                            <Image
                                source={require('../assets/icons/profile.png')}
                                style = {styles.profileLogo}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                <View style = {styles.tagListContainer}>
                    <TouchableOpacity
                        onPress={() => setSearchVisible(true)}
                        style={styles.tagBtn}
                    >  
                        <Text style={{ fontWeight: 'bold' }}>Fırsat Bul</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={tags}
                        renderItem={renderTags}
                        horizontal
                        showsHorizontalScrollIndicator = {false}
                    />
                </View>
                    {searchVisible && (
                        <TextInput
                            style = {styles.searchInput}
                            placeholder="Fırsat Ara"
                            value={searchText}
                            onChangeText={(text) => setSearchText(text)}
                            onBlur={() => setSearchVisible(false)}
                        />
                    )}
                    </View>
                <View style = {styles.promotionsContainer}>
                    <FlatList 
                        keyExtractor={(item) => item.id}
                        data={searchText ? filteredPromotions : promotions}
                        horizontal
                        bounces={false}
                        snapToAlignment={"center"}
                        decelerationRate={0}
                        snapToInterval={PhoneWidth - 60} // default -60
                        contentInset={{
                        top: 0,
                        left: 30, // default 30
                        bottom: 0,
                        right: 30, // default 30
                        }}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        renderItem={renderPromotions}
                    />
                </View>          
            </SafeAreaView>
            <BottomBar/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    topContainer: {
        width: PhoneWidth,
        height: PhoneHeight * 0.1,
        borderWidth: 0,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:'white'
    },
    logo: {
        width: 100,
        height: 50
    },
    signInBtn: {
        backgroundColor: '#F40000',
        alignItems: 'center',
        justifyContent: 'center',
        width: PhoneWidth * 0.25,
        height: 50,
        borderRadius: 30
    },
    userBtn: {
        backgroundColor: '#1D1E1C',
        borderRadius: 100,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileLogo: {
        width: 20,
        height: 20
    },
    tagListContainer: {
        width: PhoneWidth,
        height: PhoneHeight * 0.05,
        borderWidth: 0,
        flexDirection: 'row'
    },
    tagBtn: {
        borderWidth: 1.5,
        height: '100%',
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent:'center',
        alignSelf:'center',
        marginHorizontal: 5,
        borderRadius: 10,
        borderColor: 'gray',
        flexDirection: 'row'
    },
    tagBrandLogo: {
        width: 20,
        height: 20,
        marginRight: 5,
        borderRadius: 5
    },
    promotionsContainer: {
        borderWidth: 0,
        height: PhoneHeight * 0.6
    },
    promotionBox: {
        width: PhoneWidth * 0.8,
        height: PhoneHeight * 0.55,
        marginHorizontal: 10,
        marginTop: 10,
        borderBottomWidth: 15,
        borderBottomEndRadius: 40,
        borderBottomLeftRadius: 80,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: 'blue',
        backgroundColor:'white',
        borderWidth: 0.3
    },
    promotionPhoto: {
        width: PhoneWidth * 0.8, 
        height: PhoneHeight * 0.4, 
        borderBottomLeftRadius: 120,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    brandIconPhoto: {
        width: 70,
        height: 70,
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 100,
        position:'absolute'
    },
    searchInput: {
        width: PhoneWidth * 0.9,
        alignSelf:'center',
        height: 40,
        borderWidth: 1,
        borderRadius: 10
    }
})