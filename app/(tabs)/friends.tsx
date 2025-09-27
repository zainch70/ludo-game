import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { mockFriends } from '../../utils/constants';
import ProfileCard from '../components/ProfileCard';
import CustomButton from '../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, UserPlus, MessageCircle } from 'lucide-react-native';

export default function FriendsScreen() {
  const router = useRouter();
  const [friends, setFriends] = useState(mockFriends);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6A11CB', '#2575FC']}
        style={styles.header}
      >
        <Text style={styles.title}>Friends</Text>
        <Text style={styles.subtitle}>{friends.length} friends connected</Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Search size={20} color="#6c757d" />
          <Text style={styles.searchPlaceholder}>Search friends...</Text>
        </View>
      </View>

      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendCard}>
            <ProfileCard profile={item} />
            <TouchableOpacity 
              style={styles.messageButton}
              onPress={() => router.push(`/chat/${item.id}`)}
            >
              <MessageCircle size={20} color="#4A90E2" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <UserPlus size={48} color="#6c757d" />
            <Text style={styles.emptyText}>No friends found</Text>
            <Text style={styles.emptySubtext}>Start adding friends to see them here</Text>
          </View>
        }
      />
      
      <View style={styles.footer}>
        <CustomButton 
          title="Add Friends" 
          onPress={() => router.push('/add-friends')}
          gradient={['#4FACFE', '#00F2FE']}
          icon={UserPlus}
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
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: '#6c757d',
  },
  list: {
    padding: 16,
    paddingBottom: 80,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageButton: {
    padding: 8,
    backgroundColor: '#f0f8ff',
    borderRadius: 20,
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
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
});