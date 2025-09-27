import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../utils/store';
import CustomInput from '.././components/CustomInput';
import CustomButton from '.././components/CustomButton';
import { ArrowLeft, Users, Coins, Lock, Unlock } from 'lucide-react-native';

// Mock data for available rooms
const mockRooms = [
  { id: '1', name: 'Ludo Champions', players: 2, maxPlayers: 4, isPrivate: false, entryFee: 100, host: 'Emma' },
  { id: '2', name: 'Friends Only', players: 1, maxPlayers: 2, isPrivate: true, entryFee: 50, host: 'John' },
  { id: '3', name: 'Pro Players', players: 3, maxPlayers: 4, isPrivate: false, entryFee: 200, host: 'Sarah' },
];

export default function LudoJoinRoomScreen() {
  const router = useRouter();
  const { user, deductCoins } = useAuth();
  const [roomCode, setRoomCode] = useState('');
  const [rooms] = useState(mockRooms);

  const isFemale = user?.name?.toLowerCase().includes('female') || 
                  user?.name?.toLowerCase().includes('woman') ||
                  user?.isVerified;

  const handleJoinRoom = (room: typeof mockRooms[0]) => {
    // Check if male user has enough coins
    if (!isFemale && user && user.coins < room.entryFee) {
      Alert.alert('Insufficient Coins', `You need ${room.entryFee} coins to join this room`);
      return;
    }

    // Deduct coins for male users
    if (!isFemale) {
      const success = deductCoins(room.entryFee);
      if (!success) {
        Alert.alert('Error', 'Failed to deduct coins');
        return;
      }
    }

    // Join the room
    router.push(`/ludo/game-room?code=${room.id}&name=${room.name}&fee=${room.entryFee}`);
  };

  const handleJoinByCode = () => {
    if (!roomCode.trim()) {
      Alert.alert('Error', 'Please enter a room code');
      return;
    }

    // Simulate room join by code
    router.push(`/ludo/game-room?code=${roomCode}&join=true`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Join Ludo Room</Text>
        <View style={styles.coinInfo}>
          <Coins size={16} color="#FFD700" />
          <Text style={styles.coinText}>{user?.coins || 0}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Join by Code */}
        <View style={styles.joinByCode}>
          <Text style={styles.sectionTitle}>Join by Room Code</Text>
          <CustomInput
            placeholder="Enter room code"
            value={roomCode}
            onChangeText={setRoomCode}
          />
          <CustomButton 
            title="Join Room" 
            onPress={handleJoinByCode}
            style={styles.joinButton}
          />
        </View>

        {/* Available Rooms */}
        <Text style={styles.sectionTitle}>Available Rooms</Text>
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.roomCard}
              onPress={() => handleJoinRoom(item)}
            >
              <View style={styles.roomHeader}>
                <Text style={styles.roomName}>{item.name}</Text>
                {item.isPrivate ? <Lock size={16} color="#666" /> : <Unlock size={16} color="#666" />}
              </View>
              
              <View style={styles.roomDetails}>
                <View style={styles.roomDetail}>
                  <Users size={14} color="#666" />
                  <Text style={styles.detailText}>
                    {item.players}/{item.maxPlayers} players
                  </Text>
                </View>
                
                <View style={styles.roomDetail}>
                  <Coins size={14} color="#FFD700" />
                  <Text style={styles.detailText}>
                    {isFemale ? 'FREE' : `${item.entryFee} coins`}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.hostText}>Host: {item.host}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinText: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  joinByCode: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  joinButton: {
    marginTop: 10,
  },
  roomCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  roomDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
  hostText: {
    fontSize: 12,
    color: '#999',
  },
});