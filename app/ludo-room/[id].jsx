import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../utils/store';
import { db, ref, onValue, update, remove } from '../../utils/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Crown, Play, User, Shield, X } from 'lucide-react-native';

export default function LudoRoomScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user, userData } = useAuth();
  const [room, setRoom] = useState(null);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const roomRef = ref(db, `rooms/${id}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      setRoom(roomData);
      setIsHost(roomData?.host === user?.uid);
    });

    return () => unsubscribe();
  }, [id, user]);

  const approveRoom = async () => {
    try {
      await update(ref(db, `rooms/${id}`), { status: 'approved' });
    } catch (error) {
      Alert.alert('Error', 'Failed to approve room');
    }
  };

  const startGame = async () => {
    if (room.players.length < 2) {
      Alert.alert('Not enough players', 'Need at least 2 players to start');
      return;
    }

    try {
      await update(ref(db, `rooms/${id}`), { status: 'started' });
      // Navigate to actual game screen
      router.push(`/ludo-game/${id}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to start game');
    }
  };

  const leaveRoom = async () => {
    if (!room || !user) return;

    try {
      const updatedPlayers = room.players.filter(p => p.uid !== user.uid);
      
      if (updatedPlayers.length === 0) {
        // Delete room if empty
        await remove(ref(db, `rooms/${id}`));
      } else {
        // Update players list
        await update(ref(db, `rooms/${id}`), { 
          players: updatedPlayers,
          host: updatedPlayers[0].uid // Make first player host
        });
      }

      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to leave room');
    }
  };

  if (!room) {
    return (
      <View style={styles.container}>
        <Text>Loading room...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#6A11CB', '#2575FC']} style={styles.header}>
        <Text style={styles.title}>Ludo Room</Text>
        <Text style={styles.subtitle}>{room.hostName}'s Room</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Room Status */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Room Status: </Text>
          <Text style={[styles.status, 
            room.status === 'pending' ? styles.pending : styles.approved]}>
            {room.status === 'pending' ? 'Waiting Approval' : 'Approved'}
          </Text>
        </View>

        {/* Players List */}
        <Text style={styles.sectionTitle}>Players ({room.players.length}/4)</Text>
        <View style={styles.playersContainer}>
          {room.players.map((player, index) => (
            <View key={player.uid} style={styles.playerCard}>
              <View style={styles.playerInfo}>
                <User size={20} color="#6A11CB" />
                <Text style={styles.playerName}>{player.name}</Text>
                {player.uid === room.host && <Crown size={16} color="#FFD700" />}
                {player.gender === 'female' && <Text style={styles.freeBadge}>♀ Free</Text>}
              </View>
              <Text style={styles.playerStatus}>
                {player.ready ? 'Ready' : 'Not Ready'}
              </Text>
            </View>
          ))}
        </View>

        {/* Host Controls */}
        {isHost && (
          <View style={styles.hostControls}>
            {room.status === 'pending' ? (
              <TouchableOpacity style={styles.approveButton} onPress={approveRoom}>
                <Shield size={20} color="#FFF" />
                <Text style={styles.approveButtonText}>Approve Room</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.startButton} onPress={startGame}>
                <Play size={20} color="#FFF" />
                <Text style={styles.startButtonText}>Start Game</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Leave Room Button */}
        <TouchableOpacity style={styles.leaveButton} onPress={leaveRoom}>
          <X size={20} color="#dc3545" />
          <Text style={styles.leaveButtonText}>Leave Room</Text>
        </TouchableOpacity>
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
  statusCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 20, flexDirection: 'row', alignItems: 'center' },
  statusTitle: { fontSize: 16, fontWeight: 'bold' },
  status: { fontWeight: 'bold' },
  pending: { color: '#FFA500' },
  approved: { color: '#4CAF50' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  playersContainer: { marginBottom: 20 },
  playerCard: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  playerInfo: { flexDirection: 'row', alignItems: 'center' },
  playerName: { marginLeft: 8, marginRight: 8, fontWeight: '500' },
  freeBadge: { fontSize: 10, color: '#E91E63', fontWeight: 'bold' },
  playerStatus: { fontSize: 12, color: '#666' },
  hostControls: { marginBottom: 20 },
  approveButton: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  approveButtonText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
  startButton: { backgroundColor: '#2196F3', padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  startButtonText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
  leaveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 12 },
  leaveButtonText: { color: '#dc3545', fontWeight: 'bold', marginLeft: 8 },
});