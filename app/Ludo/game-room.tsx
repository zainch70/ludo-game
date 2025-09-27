import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../utils/store';
import CustomButton from '.././components/CustomButton';
import { ArrowLeft, Users, Copy, Share, Crown } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';

export default function LudoGameRoomScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const roomCode = params.code as string;
  const roomName = params.name as string;
  const entryFee = parseInt(params.fee as string) || 0;
  
  const [players, setPlayers] = useState([
    { id: '1', name: user?.name || 'You', isHost: true, isReady: true }
  ]);
  const [countdown, setCountdown] = useState(10);

  const copyRoomCode = async () => {
    await Clipboard.setStringAsync(roomCode);
    Alert.alert('Copied!', 'Room code copied to clipboard');
  };

  const startGame = () => {
    // Navigate to actual Ludo game
    router.push('/ludo/offline'); // Replace with your actual Ludo game
  };

  useEffect(() => {
    if (players.length >= 2 && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, players.length]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Game Room</Text>
        <View style={styles.playersCount}>
          <Users size={16} color="#666" />
          <Text style={styles.playersText}>{players.length}/4</Text>
        </View>
      </View>

      {/* Room Info */}
      <View style={styles.roomInfo}>
        <Text style={styles.roomName}>{roomName}</Text>
        <TouchableOpacity style={styles.roomCode} onPress={copyRoomCode}>
          <Text style={styles.roomCodeText}>Code: {roomCode}</Text>
          <Copy size={16} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {/* Players List */}
      <View style={styles.playersSection}>
        <Text style={styles.sectionTitle}>Players ({players.length}/4)</Text>
        {players.map((player) => (
          <View key={player.id} style={styles.playerCard}>
            <Text style={styles.playerName}>
              {player.name} {player.isHost && <Crown size={14} color="#FFD700" />}
            </Text>
            <Text style={styles.playerStatus}>
              {player.isReady ? 'Ready' : 'Not Ready'}
            </Text>
          </View>
        ))}
      </View>

      {/* Game Info */}
      <View style={styles.gameInfo}>
        <Text style={styles.infoText}>
          Waiting for players... {players.length < 2 && '(Need at least 2 players)'}
        </Text>
        
        {players.length >= 2 && (
          <Text style={styles.countdownText}>
            Game starting in {countdown} seconds
          </Text>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <CustomButton 
          title={players.length >= 2 ? `Start Game (${countdown}s)` : "Waiting for Players..."}
          onPress={startGame}
          disabled={players.length < 2}
          style={styles.startButton}
        />
        
        <TouchableOpacity style={styles.shareButton}>
          <Share size={16} color="#4A90E2" />
          <Text style={styles.shareText}>Share Room</Text>
        </TouchableOpacity>
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
  playersCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playersText: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
  roomInfo: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  roomName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  roomCode: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  roomCodeText: {
    marginRight: 5,
    fontWeight: 'bold',
  },
  playersSection: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  playerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '500',
  },
  playerStatus: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  gameInfo: {
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  countdownText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginTop: 10,
  },
  actions: {
    padding: 20,
  },
  startButton: {
    marginBottom: 15,
  },
  shareButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  shareText: {
    marginLeft: 8,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});