// app/(ludo)/room-create.tsx
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import api from '.././utils/api';
import { useAuth } from './../utils/store';

export default function RoomCreateScreen() {
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [entryPrice, setEntryPrice] = useState('100'); // default
  const router = useRouter();
  const { user} = useAuth();

  const createRoom = async () => {
    if (!name.trim()) return Alert.alert('Please enter room name');
    if (!user?.isHostApproved && user?.gender !== 'female') {
      return Alert.alert('Not approved to host', 'Request host approval to create rooms');
    }

    try {
      const res = await api.post('/rooms', { name, type: isPrivate ? 'private' : 'public', entryPrice: Number(entryPrice) }, token);
      router.replace(`/ludo/${res.id}`);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to create');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Room</Text>
      <CustomInput placeholder="Room Name" value={name} onChangeText={setName} />
      <CustomInput placeholder="Entry Price (coins)" value={entryPrice} onChangeText={setEntryPrice} keyboardType="numeric" />
      <CustomButton title="Create Room" onPress={createRoom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:'#fff' },
  title: { fontSize:20, fontWeight:'700', marginBottom:12, textAlign:'center' },
});
