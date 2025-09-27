import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Gamepad, Plus } from 'lucide-react-native';

export default function AllRoomsScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6A11CB', '#2575FC']}
        style={styles.header}
      >
        <Text style={styles.title}>All Rooms</Text>
        <Text style={styles.subtitle}>Browse all available game rooms</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.emptyState}>
          <Gamepad size={64} color="#6c757d" />
          <Text style={styles.emptyTitle}>No Rooms Available</Text>
          <Text style={styles.emptyText}>
            There are no public rooms available at the moment.
            Create your own room to start playing with friends!
          </Text>
          
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => router.push('/room-create')}
          >
            <Plus size={20} color="#FFF" />
            <Text style={styles.createButtonText}>Create Room</Text>
          </TouchableOpacity>
        </View>
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
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  createButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});