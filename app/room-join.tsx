// app/(ludo)/room-join.tsx
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import api from '.././utils/api';
import { useAuth } from './../utils/store';

export default function RoomJoinScreen() {
  const [code, setCode] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const joinRoom = async () => {
    if (!code.trim()) return Alert.alert('Enter room ID or code');
    try {
      const res = await api.post(`/rooms/${code}/join`, {}, token);
      // backend handles coin deduction/gender rules
      router.push(`/ludo/${res.id}`);
    } catch (err: any) {
      Alert.alert('Join failed', err.message || 'Unable to join room');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Room Code</Text>
      <CustomInput placeholder="Room ID" value={code} onChangeText={setCode} />
      <CustomButton title="Join" onPress={joinRoom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:'#fff', justifyContent:'center' },
  title: { fontSize:18, fontWeight:'600', marginBottom:12, textAlign:'center' },
});
