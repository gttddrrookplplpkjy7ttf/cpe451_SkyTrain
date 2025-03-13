import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Image source={require('../assets/photo/train.jpg')} style={styles.headerImage} />
    <Image source={require('../assets/photo/logo_skytrain.png')} style={styles.logo} />
    
    <View style={styles.iconContainer}>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="bell" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="user" size={28} color="black" />
      </TouchableOpacity>
    </View>
    
    <View style={styles.contentContainer}>
      <Text style={styles.title}>ยินดีต้อนรับสู่ Sky Train</Text>
      <Text style={styles.description}>
      แอป Sky Train ถูกพัฒนาขึ้นเพื่อช่วยให้ผู้ใช้
เดินทางด้วยรถไฟฟ้า BTS สายสีเขียวได้
อย่างสะดวก รวดเร็ว และตรงเวลา โดยออกแบบ
ให้ใช้งานง่าย เหมาะสำหรับทุกเพศทุกวัย พร้อมฟีเจอร์หลักที่ตอบโจทย์การเดินทางของคุณ
      </Text>
      <Text style={styles.feature}>✅ ตรวจสอบเวลารถไฟขบวนถัดไป: รู้ล่วงหน้าว่ารถไฟจะมาถึงสถานีของคุณเมื่อไหร่ เพื่อให้คุณวางแผนการเดินทางได้อย่างแม่นยำ</Text>
      <Text style={styles.feature}>✅ คำนวณเวลาเดินทาง: ระบุสถานีต้นทางและปลายทาง ระบบจะแสดงเวลาเดินทางโดยประมาณ รวมถึงเวลาที่รถไฟจะถึงสถานีถัดไป</Text>
      <Text style={styles.feature}>✅ คำนวณค่าโดยสารอัตโนมัติ:รู้ค่าใช้จ่ายในการเดินทางก่อนออกจากบ้าน ช่วยให้คุณจัดการงบประมาณได้ดียิ่งขึ้น</Text>
      <Text style={styles.feature}>✅ ใช้งานง่ายและรวดเร็ว:ออกแบบให้ใช้งานง่าย ทั้งผู้ใช้ใหม่และผู้ใช้ประจำ BTS</Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  logo: {
    position: 'absolute',
    top: 30,
    left: 10,
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
    backgroundColor: '#307B58',
    padding: 12,
    borderRadius: 50,
    elevation: 3,
    marginTop: 10,
  },
  contentContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  feature: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default HomeScreen;
