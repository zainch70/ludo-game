import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useAuth } from '../utils/store';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

interface Room {
  id: string;
  hostId: string;
  type: string;
  players: string[];
  watchers: string[];
  status: string;
  entryPrice?: number;
  hostGender: string;
}

export default function JoinRooms() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const roomType = params.type as string;
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    // Listen for available rooms
    const q = query(
      collection(db, 'rooms'),
      where('type', '==', roomType),
      where('status', '==', 'waiting')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomsData: Room[] = [];
      snapshot.forEach((doc) => {
        roomsData.push({ id: doc.id, ...doc.data() } as Room);
      });
      setRooms(roomsData);
    });

    return unsubscribe;
  }, [roomType]);

  const handleJoinRoom = async (room: Room) => {
    try {
      // Check if user is female or host for free entry
      if (user.gender !== 'female' && user.uid !== room.hostId) {
        // Deduct coins for male players
        // await deductCoinsForEntry(user.uid, 100); // 100 coins entry fee
      }
      
      // Join the room
      // await joinRoom(room.id, user.uid, 'player');
      
      // Navigate to the room
      router.push(`/ludo-room/${room.id}` as any);
    } catch (error) {
      Alert.alert('Error', 'Failed to join room: ' + (error as Error).message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        Available {roomType === '5-player' ? '5-Player' : '2-Player'} Rooms
      </Text>
      
      {rooms.length === 0 ? (
        <Text>No rooms available. Create one or check back later.</Text>
      ) : (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={{
                backgroundColor: '#f8f9fa',
                padding: 15,
                borderRadius: 8,
                marginBottom: 10
              }}
              onPress={() => handleJoinRoom(item)}
            >
              <Text>Room ID: {item.id.substring(0, 8)}</Text>
              <Text>Players: {item.players.length}/{roomType === '5-player' ? 5 : 2}</Text>
              <Text>Host: {item.hostGender}</Text>
              {item.entryPrice && <Text>Entry Price: {item.entryPrice} coins</Text>}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}