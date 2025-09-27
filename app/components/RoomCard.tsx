import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Room } from '../utils/types';
import { Users, Crown, Video, Lock } from 'lucide-react-native';

interface RoomCardProps {
  room: Room;
  onJoin: () => void;
}

export default function RoomCard({ room, onJoin }: RoomCardProps) {
  const isFreeEntry = room.entryFee === 0;
  
  return (
    <View style={styles.roomCard}>
      <View style={styles.roomHeader}>
        <Text style={styles.roomName}>{room.name}</Text>
        <View style={styles.roomTypeBadge}>
          <Text style={styles.roomTypeText}>{room.gameType}</Text>
        </View>
        {room.isPrivate && <Lock size={16} color="#6c757d" />}
      </View>
      
      <View style={styles.roomDetails}>
        <View style={styles.detailItem}>
          <Users size={16} color="#6c757d" />
          <Text style={styles.detailText}>
            {room.currentPlayers}/{room.maxPlayers} Players
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Crown size={16} color="#FFD700" />
          <Text style={styles.detailText}>{room.host.name}</Text>
        </View>
        
        {room.videoEnabled && (
          <View style={styles.detailItem}>
            <Video size={16} color="#4A90E2" />
            <Text style={styles.detailText}>Video Chat</Text>
          </View>
        )}
      </View>
      
      <View style={styles.footer}>
        {isFreeEntry ? (
          <Text style={styles.freeEntry}>Free Entry</Text>
        ) : (
          <Text style={styles.entryFee}>{room.entryFee} coins</Text>
        )}
        
        <TouchableOpacity 
          style={[
            styles.joinButton,
            room.status !== 'waiting' && styles.joinButtonDisabled
          ]}
          onPress={onJoin}
          disabled={room.status !== 'waiting'}
        >
          <Text style={styles.joinButtonText}>
            {room.status === 'waiting' ? 'Join' : 'Playing'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  roomCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    flex: 1,
  },
  roomTypeBadge: {
    backgroundColor: '#e8f4fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  roomTypeText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '500',
  },
  roomDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 6,
    color: '#6c757d',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  freeEntry: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  entryFee: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  joinButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonDisabled: {
    backgroundColor: '#adb5bd',
  },
  joinButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});