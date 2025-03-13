import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard } from 'react-native';
import MapView, { UrlTile, Marker, Polyline } from 'react-native-maps';

const BTS_STATIONS = [
  { name: 'หมอชิต', latitude: 13.8022, longitude: 100.5539 },
  { name: 'ห้าแยกลาดพร้าว', latitude: 13.8155, longitude: 100.5602 },
  { name: 'พหลโยธิน 24', latitude: 13.8261, longitude: 100.5653 },
  { name: 'รัชโยธิน', latitude: 13.8308, longitude: 100.5713 },
  { name: 'เสนานิคม', latitude: 13.8383, longitude: 100.5759 },
  { name: 'มหาวิทยาลัยเกษตรศาสตร์', latitude: 13.8463, longitude: 100.5738 },
  { name: 'กรมป่าไม้', latitude: 13.8527, longitude: 100.5786 },
  { name: 'บางบัว', latitude: 13.8603, longitude: 100.5816 },
  { name: 'กรมทหารราบที่ 11', latitude: 13.8669, longitude: 100.5854 },
  { name: 'วัดพระศรีมหาธาตุ', latitude: 13.8782, longitude: 100.5894 },
  { name: 'อนุสาวรีย์หลักสี่', latitude: 13.8875, longitude: 100.5925 },
  { name: 'สายหยุด', latitude: 13.8946, longitude: 100.5983 },
  { name: 'สะพานใหม่', latitude: 13.9031, longitude: 100.6018 },
  { name: 'โรงพยาบาลภูมิพลอดุลยเดช', latitude: 13.9123, longitude: 100.6065 },
  { name: 'พิพิธภัณฑ์กองทัพอากาศ', latitude: 13.9196, longitude: 100.6076 },
  { name: 'คูคต', latitude: 13.9304, longitude: 100.6131 },
  { name: 'สะพานควาย', latitude: 13.7986, longitude: 100.5536 },
  { name: 'อารีย์', latitude: 13.7899, longitude: 100.5483 },
  { name: 'สนามเป้า', latitude: 13.7806, longitude: 100.5423 },
  { name: 'อนุสาวรีย์ชัยสมรภูมิ', latitude: 13.7655, longitude: 100.5370 },
  { name: 'พญาไท', latitude: 13.7563, longitude: 100.5330 },
  { name: 'ราชเทวี', latitude: 13.7502, longitude: 100.5316 },
  { name: 'สยาม', latitude: 13.7455, longitude: 100.5346 },
  { name: 'ชิดลม', latitude: 13.7462, longitude: 100.5402 },
  { name: 'เพลินจิต', latitude: 13.7439, longitude: 100.5480 },
  { name: 'นานา', latitude: 13.7414, longitude: 100.5534 },
  { name: 'อโศก', latitude: 13.7370, longitude: 100.5603 },
  { name: 'พร้อมพงษ์', latitude: 13.7304, longitude: 100.5692 },
  { name: 'ทองหล่อ', latitude: 13.7246, longitude: 100.5780 },
  { name: 'เอกมัย', latitude: 13.7194, longitude: 100.5848 },
  { name: 'พระโขนง', latitude: 13.7165, longitude: 100.5904 },
  { name: 'อ่อนนุช', latitude: 13.7076, longitude: 100.6017 },
  { name: 'บางนา', latitude: 13.6683, longitude: 100.6043 },
];

const getNearestBTS = (latitude, longitude) => {
  let nearestStation = null;
  let minDistance = Infinity;
  
  BTS_STATIONS.forEach(station => {
    const distance = Math.sqrt(
      Math.pow(station.latitude - latitude, 2) + Math.pow(station.longitude - longitude, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      nearestStation = station;
    }
  });

  return nearestStation;
};

const App = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [btsRoute, setBtsRoute] = useState([]);
  const [startStation, setStartStation] = useState(null);
  const [endStation, setEndStation] = useState(null);

  const searchRoute = async () => {
    Keyboard.dismiss();

    try {
      const startRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${start}`);
      const startData = await startRes.json();
      const endRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${end}`);
      const endData = await endRes.json();

      if (startData.length > 0 && endData.length > 0) {
        const startLat = parseFloat(startData[0].lat);
        const startLon = parseFloat(startData[0].lon);
        const endLat = parseFloat(endData[0].lat);
        const endLon = parseFloat(endData[0].lon);

        const nearestStartBTS = getNearestBTS(startLat, startLon);
        const nearestEndBTS = getNearestBTS(endLat, endLon);

        if (nearestStartBTS && nearestEndBTS) {
          setStartStation(nearestStartBTS.name);
          setEndStation(nearestEndBTS.name);
          
          const startIndex = BTS_STATIONS.findIndex(station => station.name === nearestStartBTS.name);
          const endIndex = BTS_STATIONS.findIndex(station => station.name === nearestEndBTS.name);

          const route = startIndex <= endIndex
            ? BTS_STATIONS.slice(startIndex, endIndex + 1)
            : BTS_STATIONS.slice(endIndex, startIndex + 1).reverse();

          setBtsRoute(route);
        } else {
          alert('ไม่พบสถานี BTS ที่ใกล้ที่สุด');
        }
      } else {
        alert('ไม่พบข้อมูลสถานที่');
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.input} placeholder="จุดเริ่มต้น" value={start} onChangeText={setStart} />
        <TextInput style={styles.input} placeholder="จุดหมาย" value={end} onChangeText={setEnd} />
        <Button title="ค้นหาเส้นทาง" onPress={searchRoute} />
      </View>

      {startStation && endStation && (
        <View style={styles.stationInfo}>
          <Text>🚆 สถานีต้นทาง: {startStation}</Text>
          <Text>🚉 สถานีปลายทาง: {endStation}</Text>
        </View>
      )}

      <MapView style={styles.map}
        initialRegion={{
          latitude: 13.7563,  // กำหนดเป็นกรุงเทพ
          longitude: 100.5018,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <UrlTile urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maximumZ={19} />
        {btsRoute.map((station, index) => (
          <Marker key={index} coordinate={{ latitude: station.latitude, longitude: station.longitude }} title={`BTS ${station.name}`} pinColor="red" />
        ))}
        {btsRoute.length > 1 && (
          <Polyline coordinates={btsRoute.map(station => ({ latitude: station.latitude, longitude: station.longitude }))} strokeWidth={4} strokeColor="red" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1000,
  },
  stationInfo: {
    position: 'absolute',
    top: 100,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1000,
  },
  input: {
    height: 40,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  map: { flex: 1, marginTop: 150 },
});

export default App;
