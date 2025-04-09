import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const { height } = Dimensions.get('window');

const MapScreen = () => {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [location, setLocation] = useState(null);

  // เรียกขออนุญาตและตำแหน่งปัจจุบัน
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Error", "กรุณาอนุญาตให้แอปเข้าถึงตำแหน่งของคุณ");
        console.log("Permission to access location was denied");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Error", "กรุณาอนุญาตให้แอปเข้าถึงตำแหน่งของคุณ");
        return;
      }

      // อัปเดตตำแหน่งแบบเรียลไทม์
      const locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
        (location) => {
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      );

      return () => locationSubscription.remove(); // ยกเลิกการติดตามเมื่อออกจากหน้า
    };

    requestLocation();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* รูปเฮดเดอร์ */}
      <Image source={require('../assets/photo/train.jpg')} style={styles.headerImage} />
      <Image source={require('../assets/photo/logo_skytrain.png')} style={styles.logo} />

      {/* กล่องค้นหา */}
      <View style={styles.searchContainer}>
        <Text style={styles.title}>ยินดีต้อนรับสู่ Sky Train</Text>
        {location && (
          <TouchableOpacity onPress={() => navigation.navigate('RouteSearch', { startLocation: location })}>
            <View style={styles.inputGroup}>
              <Icon name="map-marker" size={20} color="#307B58" />
              <Text style={styles.input}>คุณจะไปที่ไหน?</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* แผนที่ */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 13.7563,
          longitude: currentLocation ? currentLocation.longitude : 100.5018,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={
          currentLocation
            ? {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : undefined
        }
      >
        {/* แสดงตำแหน่งปัจจุบัน */}
        {currentLocation && (
          <Marker coordinate={currentLocation}>
            <Icon name="street-view" size={30} color="red" />
          </Marker>
        )}
      </MapView>

      {/* พื้นที่ว่างเพิ่มการเลื่อน */}
      <View style={styles.extraSpace} />

      {/* ติดต่อเจ้าของแอพ */}
      <View style={styles.contactContainer}>
        <Text style={styles.contactText}>ติดต่อเรา: skytrain.support@email.com</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingBottom: 100 },
  headerImage: { width: '100%', height: 350, resizeMode: 'cover' },
  logo: { position: 'absolute', top: 30, left: 10, width: 75, height: 75, resizeMode: 'contain' },
  searchContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
    elevation: 5,
  },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', padding: 10, borderRadius: 10, marginBottom: 10 },
  input: { flex: 1, marginLeft: 10 },
  map: { height: height * 0.75, width: '100%', overflow: 'hidden' },
  extraSpace: { height: 200 },
  contactContainer: { padding: 20, alignItems: 'center', backgroundColor: '#f8f8f8', marginTop: 10 },
  contactText: { fontSize: 14, color: '#333' },
});

export default MapScreen;
