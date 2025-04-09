import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const route = useRoute();
  const { startStation, endStation, busStations } = route.params || {}; // รับข้อมูลสถานีต้นทาง, ปลายทาง และ busStations จาก RouteSearchScreen
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [endStationVisible, setEndStationVisible] = useState(true); // เพิ่มสถานะสำหรับแสดงหมุดปลายทาง
  const navigation = useNavigation();

  useEffect(() => {
    if (startStation && endStation) {
      console.log('Start Station:', startStation);
      console.log('End Station:', endStation);
      generateRoute(startStation, endStation); // สร้างเส้นทางจากข้อมูลสถานี
    } else {
      Alert.alert("Error", "ข้อมูลสถานีไม่ครบถ้วน");
      console.log("สถานีไม่สมบูรณ์");
    }
  }, [startStation, endStation]);

  // ฟังก์ชันสำหรับสร้างเส้นทางจากข้อมูลสถานี
  const generateRoute = (start, end) => {
    const coordinates = [
      { latitude: start.lat, longitude: start.lon },
      { latitude: end.lat, longitude: end.lon },
    ];

    setRouteCoordinates(coordinates); // ตั้งค่าเส้นทางที่ได้
  };

  const clearRoute = () => {
    setRouteCoordinates([]); // ลบเส้นทางที่ค้นหา
    setEndStationVisible(false); // ซ่อนหมุดปลายทาง
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" marginTop={20} />
        </TouchableOpacity>
      </View>

      {startStation && endStation && (
        <View style={styles.stationBanner}>
          <View style={styles.stationBox}><Text style={styles.stationText}>{startStation.name}</Text></View>
          <FontAwesome name="arrow-right" size={20} color="#337F5B" padding={5} style={styles.arrowIcon} />
          <View style={styles.stationBox}><Text style={styles.stationText}>{endStation.name}</Text></View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearRoute}>
          <Text style={styles.buttonText}>ลบเส้นทางที่ค้นหา</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceRateButton}>
          <Text style={styles.buttonText}>อัตราการบริการ</Text>
        </TouchableOpacity>
      </View>

      <MapView style={styles.map}
        initialRegion={{
          latitude: (startStation && endStation) ? (startStation.lat + endStation.lat) / 2 : 13.7563,
          longitude: (startStation && endStation) ? (startStation.lon + endStation.lon) / 2 : 100.5018,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {startStation && (
          <Marker
            coordinate={{ latitude: startStation.lat, longitude: startStation.lon }}
            title={startStation.name}
            pinColor="green"
          />
        )}

        {endStation && endStationVisible && ( // ตรวจสอบสถานะเพื่อแสดงหมุดปลายทาง
          <Marker
            coordinate={{ latitude: endStation.lat, longitude: endStation.lon }}
            title={endStation.name}
            pinColor="red"
          />
        )}

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop:20 },
  header: { 
    paddingVertical: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    borderRadius: 10 
  },
  stationBanner: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1000,
    marginTop: 10
  },
  stationBox: {
    backgroundColor: '#337F5B',
    padding: 12, 
    borderRadius: 10,
  },
  stationText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute', 
    top: 90, 
    left: 5, 
    right: 5, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingHorizontal: 5, 
    zIndex: 1000,
    marginTop: 15,
  },
  clearButton: { 
    backgroundColor: '#ddd', 
    padding: 5, 
    borderRadius: 5 
  },
  serviceRateButton: { 
    backgroundColor: '#FFD97E', 
    padding: 5, 
    borderRadius: 5,
  },
  map: { flex: 1, marginTop: 80 },
});

export default MapScreen;
