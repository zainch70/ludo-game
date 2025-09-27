import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../utils/store';
import { db, ref, push, onValue, set, update } from '../utils/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { Gamepad, Users, Plus, Crown, Coin, User, Shield } from 'lucide-react-native';

export default function LudoMenuScreen() {
  const router = useRouter();
  const { user, userData } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const roomsRef = ref(db, 'rooms');
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const roomsData = snapshot.val() || {};
      const roomsList = Object.entries(roomsData)
        .map(([id, room]) => ({ id, ...room }))
        .filter(room => room.status === 'approved' && room.players.length < 4);
      setRooms(roomsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createRoom = async () => {
    if (!user) return;

    // Check if user has enough coins (if male)
    if (userData?.gender === 'male') {
      if ((userData?.coins || 0) < 30) {
        Alert.alert('Insufficient Coins', 'You need 30 coins to create a room');
        return;
      }
    }

    try {
      const roomRef = push(ref(db, 'rooms'));
      const newRoom = {
        host: user.uid,
        hostName: userData?.name || 'Player',
        players: [{
          uid: user.uid,
          name: userData?.name || 'Player',
          gender: userData?.gender,
          ready: false
        }],
        status: 'pending', // Requires host approval
        createdAt: Date.now(),
        entryFee: userData?.gender === 'female' ? 0 : 30
      };

      await set(roomRef, newRoom);

      // Deduct coins if male
      if (userData?.gender === 'male') {
        const userRef = ref(db, `users/${user.uid}`);
        await update(userRef, {
          coins: (userData?.coins || 0) - 30
        });
      }

      router.push(`/ludo-room/${roomRef.key}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to create room');
    }
  };

  const joinRoom = async (roomId) => {
    if (!user) return;

    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    // Check if user has enough coins (if male)
    if (userData?.gender === 'male') {
      if ((userData?.coins || 0) < room.entryFee) {
        Alert.alert('Insufficient Coins', `You need ${room.entryFee} coins to join this room`);
        return;
      }
    }

    try {
      const roomRef = ref(db, `rooms/${roomId}`);
      const updatedPlayers = [...room.players, {
        uid: user.uid,
        name: userData?.name || 'Player',
        gender: userData?.gender,
        ready: false
      }];

      await update(roomRef, { players: updatedPlayers });

      // Deduct coins if male
      if (userData?.gender === 'male') {
        const userRef = ref(db, `users/${user.uid}`);
        await update(userRef, {
          coins: (userData?.coins || 0) - room.entryFee
        });
      }

      router.push(`/ludo-room/${roomId}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to join room');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#6A11CB', '#2575FC']} style={styles.header}>
        <Text style={styles.title}>Ludo Game</Text>
        <Text style={styles.subtitle}>Create or join a room to start playing</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* User Info */}
        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <User size={24} color="#6A11CB" />
            <Text style={styles.userName}>{userData?.name || 'Player'}</Text>
            <View style={[styles.genderBadge, 
              userData?.gender === 'female' ? styles.femaleBadge : styles.maleBadge]}>
              <Text style={styles.genderText}>
                {userData?.gender === 'female' ? '♀ Free Entry' : '♂ 30 Coins'}
              </Text>
            </View>
          </View>
          <View style={styles.coinInfo}>
            <Coin size={20} color="#FFD700" />
            <Text style={styles.coinText}>{userData?.coins || 0} coins</Text>
          </View>
        </View>

        {/* Create Room Button */}
        <TouchableOpacity style={styles.createButton} onPress={createRoom}>
          <LinearGradient colors={['#4FACFE', '#00F2FE']} style={styles.createButtonGradient}>
            <Plus size={24} color="#FFF" />
            <Text style={styles.createButtonText}>Create Room</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Available Rooms */}
        <Text style={styles.sectionTitle}>Available Rooms ({rooms.length})</Text>
        
        {loading ? (
          <Text style={styles.loadingText}>Loading rooms...</Text>
        ) : rooms.length === 0 ? (
          <Text style={styles.noRoomsText}>No available rooms. Create one!</Text>
        ) : (
          rooms.map((room) => (
            <TouchableOpacity key={room.id} style={styles.roomCard} onPress={() => joinRoom(room.id)}>
              <View style={styles.roomHeader}>
                <View style={styles.roomHost}>
                  <Crown size={16} color="#FFD700" />
                  <Text style={styles.hostName}>{room.hostName}</Text>
                </View>
                <Text style={styles.playersCount}>{room.players.length}/4 Players</Text>
              </View>
              
              <View style={styles.roomInfo}>
                <View style={styles.playersList}>
                  {room.players.map((player, index) => (
                    <View key={index} style={styles.playerTag}>
                      <User size={12} color="#6A11CB" />
                      <Text style={styles.playerName}>{player.name}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.entryFee}>
                  <Coin size={14} color="#FFD700" />
                  <Text style={styles.entryFeeText}>Entry: {room.entryFee} coins</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { paddingTop: 50, paddingBottom: 20, paddingHorizontal: 16, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFF', textAlign: 'center' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: 5 },
  content: { flex: 1, padding: 16 },
  userCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginRight: 12 },
  genderBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  femaleBadge: { backgroundColor: '#FFE4E6' },
  maleBadge: { backgroundColor: '#E0F2FE' },
  genderText: { fontSize: 10, fontWeight: 'bold' },
  coinInfo: { flexDirection: 'row', alignItems: 'center' },
  coinText: { marginLeft: 4, fontWeight: 'bold' },
  createButton: { borderRadius: 16, marginBottom: 20, overflow: 'hidden' },
  createButtonGradient: { padding: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  createButtonText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  loadingText: { textAlign: 'center', color: '#666', marginTop: 20 },
  noRoomsText: { textAlign: 'center', color: '#666', marginTop: 20, fontStyle: 'italic' },
  roomCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12 },
  roomHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  roomHost: { flexDirection: 'row', alignItems: 'center' },
  hostName: { marginLeft: 6, fontWeight: 'bold' },
  playersCount: { color: '#666', fontSize: 12 },
  roomInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  playersList: { flexDirection: 'row', flexWrap: 'wrap', flex: 1 },
  playerTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 4, borderRadius: 8, marginRight: 6, marginBottom: 4 },
  playerName: { fontSize: 10, marginLeft: 2 },
  entryFee: { flexDirection: 'row', alignItems: 'center' },
  entryFeeText: { fontSize: 12, marginLeft: 4, color: '#666' },
});