import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// ข้อมูลแจ้งเตือน
const notifications = [
  { id: '1', title: 'รถไฟเที่ยวสุดท้ายคือ!!', message: 'รถไฟเที่ยวสุดท้ายของวันนี้ คือ เวลา xx:xx\nอย่าลืมวางแผนการเดินทางกันนะคะ', time: '22:00 น.', isNew: true },
  { id: '2', title: 'รถไฟเกิดความล่าช้า!!', message: 'เกิดเหตุขัดข้องทางเทคนิค ตอนนี้รถไฟขาวมีการล่าช้าสักน้อย อดใจรอสักครู่นะคะ', time: 'พ. 26/2', isNew: false },
];

// Component สำหรับแสดงแจ้งเตือนแต่ละรายการ
const NotificationItem = ({ title, message, time, isNew }) => (
  <View style={[styles.notificationBox, isNew && styles.newNotification]}>
    <Icon name="envelope" size={28} color="black" style={styles.notificationIcon} />
    <View style={styles.textContainer}>
      <Text style={styles.notificationTitle}>{title}</Text>
      <Text style={styles.notificationMessage}>{message}</Text>
    </View>
    <Text style={styles.notificationTime}>{time}</Text>
  </View>
);

export default function Notification() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconArrow}>
          <Icon name="arrow-left" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>การแจ้งเตือน</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="bell" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, styles.profileButton]}>
            <Icon name="user" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* FlatList สำหรับแจ้งเตือน */}
      <FlatList
        data={notifications} // ใช้ข้อมูลแจ้งเตือนทั้งหมด
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem {...item} />} // เรียกใช้ Component
        ListFooterComponent={<View style={{ height: 10 }} />} // ป้องกัน FlatList ชิดขอบล่าง
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, justifyContent: 'space-between' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'left', marginTop: 20 },
  iconContainer: { flexDirection: 'row' },
  iconArrow: { marginTop: 20, padding: 10 },
  iconButton: { backgroundColor: '#FFD166', padding: 8, borderRadius: 20, marginLeft: 10, marginTop: 20 },
  profileButton: { backgroundColor: '#2D6A4F' },
  notificationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFF0D8',
    padding: 10,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  newNotification: { backgroundColor: '#C8E6C9' },
  notificationIcon: { marginRight: 10 },
  textContainer: { flex: 1 },
  notificationTitle: { fontSize: 14, fontWeight: 'bold' },
  notificationMessage: { fontSize: 12 },
  notificationTime: { fontSize: 12, color: 'gray' },
});
