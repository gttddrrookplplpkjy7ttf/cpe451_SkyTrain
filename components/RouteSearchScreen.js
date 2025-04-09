import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { btsStations } from './BusStation';

// คำนวณระยะทางระหว่าง 2 จุด (Haversine Formula)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const RouteSearchScreen = () => {
  const navigation = useNavigation();
  const [startText, setStartText] = useState('');
  const [endText, setEndText] = useState('');
  const [startStation, setStartStation] = useState(null);
  const [endStation, setEndStation] = useState(null);
  const [filteredStations, setFilteredStations] = useState(btsStations);
  const route = useRoute();
  const { startLocation } = route.params || {}; // รับค่าพิกัดที่ถูกส่งมา
  
  useEffect(() => {
    if (startLocation) {
      findNearestStation(startLocation.latitude, startLocation.longitude, 'start');
    }
  }, [startLocation]);

  useEffect(() => {
    if (startText) {
      filterStationsBySearch(startText);
    } else {
      setFilteredStations(btsStations);
    }
  }, [startText]);

  useEffect(() => {
    if (endText) {
      filterStationsByEndSearch(endText);
    } else {
      setFilteredStations(btsStations);
    }
  }, [endText]);

  const filterStationsByEndSearch = (text) => {
    const filtered = btsStations
      .filter(station =>
        station.name.toLowerCase().includes(text.toLowerCase()) ||
        station.english.toLowerCase().includes(text.toLowerCase()) ||
        (station.nearby && station.nearby.some(place => place.toLowerCase().includes(text.toLowerCase())))
      )
      .map(station => ({
        ...station,
        distance: getDistance(startStation?.lat || 0, startStation?.lon || 0, station.lat, station.lon),
      }))
      .sort((a, b) => a.distance - b.distance);
  
    setFilteredStations(filtered);
  };
  

  const findNearestStation = (lat, lon, type) => {
    const nearestStation = [...btsStations]
      .map(station => ({
        ...station,
        distance: getDistance(lat, lon, station.lat, station.lon),
      }))
      .sort((a, b) => a.distance - b.distance)[0];

    if (type === 'start') setStartStation(nearestStation);
    else setEndStation(nearestStation);
  };

  const onPress = () => {
    if (startStation && endStation) {
      navigation.navigate('Map', { startStation, endStation }); // ส่งข้อมูลสถานีต้นทางและปลายทางไปยัง MapScreen
    } else {
      alert('กรุณากรอกสถานีต้นทางและปลายทาง');
    }
  };
  

  const handleStartTextChange = (text) => {
    setStartText(text);

    // ถ้าผู้ใช้ลบข้อความทั้งหมดให้กำหนด startStation เป็น null
    if (text === '') {
      setStartStation(null);
    }
  };

  const filterStationsBySearch = (text) => {
    const filtered = btsStations.filter(station =>
      station.name.toLowerCase().includes(text.toLowerCase()) ||
      station.english.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStations(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ค้นหาเส้นทาง</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="พิมพ์สถานที่ต้นทาง..."
        placeholderTextColor="#666"
        value={startText || (startStation ? startStation.name : '')} // ถ้า startText ว่างให้ใช้ชื่อสถานีต้นทางที่ใกล้ที่สุด
        onChangeText={handleStartTextChange} // ใช้ฟังก์ชันใหม่ที่ปรับปรุง
      />

      <TextInput
        style={styles.input}
        placeholder="พิมพ์สถานที่ปลายทาง..."
        placeholderTextColor="#666"
        value={endText}
        onChangeText={setEndText}
      />

      <TouchableOpacity style={styles.searchButton} onPress={onPress}>
        <Text style={styles.buttonText}>ค้นหาเส้นทาง</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredStations} // ใช้ filteredStations แทน btsStations
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.stationItem}
            onPress={() => {
              if (!startStation) {
                setStartStation(item);
                setStartText(item.name); // กำหนดข้อความที่จะแสดงในฟิลด์ต้นทาง
              } else if (!endStation) {
                setEndStation(item);
                setEndText(item.name); // กำหนดข้อความที่จะแสดงในฟิลด์ปลายทาง
              }
            }}
          >
            <View style={styles.stationIcon}>
              <Text style={styles.stationText}>{item.id}</Text>
            </View>
            <View>
              <Text style={styles.stationName}>{item.name}</Text>
              <Text style={styles.stationEnglish}>{item.english}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffff', 
    padding: 20 
  },
  header: { 
    backgroundColor: '#ffffff', 
    paddingVertical: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingLeft: 0,
    borderRadius: 10 
  },
  headerTitle: { 
    color: 'black', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginLeft: 10 
  },
  input: { 
    backgroundColor: '#fff', 
    padding: 12, 
    fontSize: 18, 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    marginTop: 15 
  },
  
  searchButton: { 
    marginTop: 20, 
    borderRadius: 10, 
    overflow: 'hidden',
    backgroundColor: '#337F5B',
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  stationIcon: {
    backgroundColor: '#7ED957',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  stationText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stationEnglish: {
    fontSize: 14,
    color: '#777',
  },
});

export default RouteSearchScreen;
