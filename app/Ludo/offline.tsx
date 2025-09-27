import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Import your existing Ludo component (you'll replace this with your actual component)
// import Ludo2PlayerOffline from './Ludo2PlayerOffline';

export default function LudoOfflineScreen() {
  const router = useRouter();

  // Temporary placeholder - replace with your actual Ludo2PlayerOffline component
  const LudoGame = () => (
    <View style={styles.gameContainer}>
      <Text style={styles.title}>2 Player Offline Ludo</Text>
      <Text style={styles.message}>Your Ludo game will be integrated here</Text>
      <Text style={styles.note}>
        Replace this with your Ludo2PlayerOffline component
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Back to Ludo</Text>
      </TouchableOpacity>
      
      <LudoGame />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButtonText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '500',
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  note: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});