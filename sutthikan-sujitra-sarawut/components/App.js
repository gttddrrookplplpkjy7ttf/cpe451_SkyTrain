import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabbarScreen from "./TabBar.js";  // นำเข้า TabBar.js ที่เราสร้างไว้
import MapScreen from "./map.js";  // ไฟล์ที่สร้างไว้
import MathScreen from "./math.js";  // ไฟล์ที่สร้างไว้
import SearchScreen from "./Search.js";  // ไฟล์ที่สร้างไว้

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* หน้าหลัก (TabBar) */}
        <Stack.Screen
          name=""
          component={TabbarScreen} // ใช้ TabBar เป็นหน้าหลัก
          options={{ headerShown: true }} // ปิดการแสดง header
        />
        
        {/* หน้า Map ที่ต้องการแสดง header */}
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: "แผนที่", // ชื่อแสดงในแถบหัวข้อ
            headerStyle: {
              backgroundColor: "#337F5B", // พื้นหลังของแถบหัวข้อเป็นสีเขียว
            },
            headerTintColor: "#fff", // สีฟอนต์ในแถบหัวข้อเป็นสีขาว
          }}
        />
        
        {/* หน้า Math ที่ต้องการแสดง header */}
        <Stack.Screen
          name="math"
          component={MathScreen}  // เชื่อมโยงไปที่ MathScreen
          options={{
            title: "คำนวณค่าเดินทาง", // ชื่อแสดงในแถบหัวข้อ
            headerStyle: {
              backgroundColor: "#337F5B", // พื้นหลังของแถบหัวข้อเป็นสีเขียว
            },
            headerTintColor: "#fff", // สีฟอนต์ในแถบหัวข้อเป็นสีขาว
          }}
        />
        
        {/* หน้า Search ที่ต้องการแสดง header */}
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: "เลือกสถานี",  // ชื่อแสดงในแถบหัวข้อ
            headerStyle: {
              backgroundColor: "#337F5B",  // พื้นหลังของแถบหัวข้อเป็นสีเขียว
            },
            headerTintColor: "#fff",  // สีฟอนต์ในแถบหัวข้อเป็นสีขาว
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
