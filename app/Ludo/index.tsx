import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../utils/store';
import { Crown, Users, Plus, Play } from 'lucide-react-native';

export default function LudoSelectionScreen() {
  const router = useRouter();
  const { user } = useAuth();

  // Check if user has host permissions (simulated - you can modify this logic)
  const hasHostPermissions = user?.isVerified || user?.coins > 200;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Ludo Arena</Text>
      <Text style={styles.subtitle}>Choose how you want to play</Text>
      
      {/* Quick Play Option */}
      <TouchableOpacity 
        style={styles.option}
        onPress={() => router.push('/ludo/quick-play')}
      >
        <Play size={24} color="#4A90E2" />
        <View style={styles.optionContent}>
          <Text style={styles.optionText}>Quick Play</Text>
          <Text style={styles.optionSubtext}>Start a game immediately with AI players</Text>
        </View>
      </TouchableOpacity>

      {/* Create Room Option */}
      <TouchableOpacity 
        style={styles.option}
        onPress={() => router.push('/ludo/create-room')}
        disabled={!hasHostPermissions}
      >
        <Plus size={24} color={hasHostPermissions ? "#4A90E2" : "#999"} />
        <View style={styles.optionContent}>
          <Text style={[styles.optionText, !hasHostPermissions && styles.disabledText]}>
            Create Room
          </Text>
          <Text style={styles.optionSubtext}>
            {hasHostPermissions 
              ? "Create a private room for friends" 
              : "Need host permissions to create rooms"
            }
          </Text>
        </View>
        {hasHostPermissions && <Crown size={16} color="#FFD700" />}
      </TouchableOpacity>

      {/* Join Room Option */}
      <TouchableOpacity 
        style={styles.option}
        onPress={() => router.push('/ludo/join-room')}
      >
        <Users size={24} color="#4A90E2" />
        <View style={styles.optionContent}>
          <Text style={styles.optionText}>Join Room</Text>
          <Text style={styles.optionSubtext}>Join an existing game room</Text>
        </View>
      </TouchableOpacity>

      {/* Coin Balance Display */}
      <View style={styles.coinBalance}>
        <Text style={styles.coinText}>Your coins: {user?.coins || 0}</Text>
        <Text style={styles.coinNote}>
          {user?.coins < 100 ? "You need 100 coins to join rooms as male player" : "Ready to play!"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A90E2',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  optionContent: {
    flex: 1,
    marginLeft: 15,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  optionSubtext: {
    fontSize: 14,
    color: '#666',
  },
  disabledText: {
    color: '#999',
  },
  coinBalance: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
  },
  coinText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  coinNote: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
});