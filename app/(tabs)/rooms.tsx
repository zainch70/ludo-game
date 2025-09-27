import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../utils/store';
import RoomCard from '../components/RoomCard';
import CustomButton from '../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Plus, Search, Gamepad, Crown } from 'lucide-react-native';
import { subscribeToRooms, getRoomsByStatus } from '../../utils/api';

export default function RoomsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'waiting' | 'active'>('all');

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const fetchRooms = async () => {
      try {
        setLoading(true);
        
        if (filter === 'all') {
          unsubscribe = subscribeToRooms((roomsData) => {
            setRooms(roomsData);
            setLoading(false);
          });
        } else {
          const filteredRooms = await getRoomsByStatus(filter);
          setRooms(filteredRooms);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setLoading(false);
      }
    };

    fetchRooms();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [filter]);

  const canCreateRoom = user?.isHostApproved || user?.gender === 'female';

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading rooms...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6A11CB', '#2575FC']}
        style={styles.header}
      >
        <Text style={styles.title}>Game Rooms</Text>
        <Text style={styles.subtitle}>Join or create a room to play with friends</Text>
        
        <View style={styles.filterContainer}>
          {['all', 'waiting', 'active'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterButton, filter === f && styles.activeFilter]}
              onPress={() => setFilter(f as any)}
            >
              <Text style={[styles.filterText, filter === f && styles.activeFilterText]}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Crown size={20} color="#4A90E2" />
          <Text style={styles.statText}>
            {user?.isHostApproved ? 'Host Approved' : 'Request Host Access'}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Gamepad size={20} color="#4A90E2" />
          <Text style={styles.statText}>Coins: {user?.coins || 0}</Text>
        </View>
      </View>

      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RoomCard 
            room={item} 
            onJoin={() => router.push(`/room/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Gamepad size={48} color="#6c757d" />
            <Text style={styles.emptyText}>No rooms available</Text>
            <Text style={styles.emptySubtext}>Create a room to get started</Text>
          </View>
        }
      />
      
      <View style={styles.footer}>
        {canCreateRoom ? (
          <>
            <CustomButton 
              title="Create Standard Room" 
              onPress={() => router.push('/room-create')}
              gradient={['#4FACFE', '#00F2FE']}
              icon={Plus}
              style={styles.button}
            />
            {user?.gender === 'female' && (
              <CustomButton 
                title="Create Queen Room" 
                onPress={() => router.push('/queen-room')}
                gradient={['#FF9A8B', '#FF6A88']}
                icon={Crown}
                style={styles.button}
              />
            )}
          </>
        ) : (
          <CustomButton 
            title="Request Host Access" 
            onPress={() => router.push('/host-request')}
            variant="outline"
            style={styles.fullWidthButton}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    color: '#6c757d',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  filterText: {
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#FFF',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 8,
    fontWeight: '500',
    color: '#343a40',
  },
  list: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    gap: 12,
  },
  button: {
    flex: 1,
  },
  fullWidthButton: {
    width: '100%',
  },
});