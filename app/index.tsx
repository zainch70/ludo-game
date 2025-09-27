import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '.././utils/store';

export default function LudoMenu() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LUDO GAME</Text>
      
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => router.push('/Ludo/create-room?type=2-player')}
        >
          <Text style={styles.buttonText}>Create 2-Player Room</Text>
          <Text style={styles.buttonSubtext}>Queen Play with Entry Fee</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => router.push('/Ludo/create-room?type=5-player')}
        >
          <Text style={styles.buttonText}>Create 5-Player Room</Text>
          <Text style={styles.buttonSubtext}>Free to Play</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => router.push('/join-rooms?type=2-player')}
        >
          <Text style={styles.buttonText}>Join 2-Player Rooms</Text>
          <Text style={styles.buttonSubtext}>Play with Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => router.push('/join-rooms?type=5-player')}
        >
          <Text style={styles.buttonText}>Join 5-Player Rooms</Text>
          <Text style={styles.buttonSubtext}>Find Public Games</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuButton, styles.localButton]}
          onPress={() => router.push('/Ludo/offline')}
        >
          <Text style={styles.buttonText}>Local Game</Text>
          <Text style={styles.buttonSubtext}>Play Offline</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.userText}>Welcome, {user?.name}</Text>
        <Text style={styles.userText}>Coins: {user?.coins || 0}</Text>
        <Text style={styles.userText}>Gender: {user?.gender}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    color: '#333',
  },
  menuContainer: {
    gap: 15,
  },
  menuButton: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  localButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSubtext: {
    color: '#E3F2FD',
    fontSize: 12,
    marginTop: 5,
  },
  userInfo: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  userText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
});