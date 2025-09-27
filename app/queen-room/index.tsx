import { useState } from 'react';
import { View, Text, StyleSheet, Alert, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../utils/store';
import CustomButton from '.././components/CustomButton';
import CustomInput from '.././components/CustomInput';
import { LinearGradient } from 'expo-linear-gradient';
import { Crown, ArrowLeft, Video, Coins, Users, Lock } from 'lucide-react-native';
import { createRoom } from '../../utils/api';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function QueenRoomCreateScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [roomName, setRoomName] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createQueenRoom = async () => {
    if (!roomName.trim()) {
      Alert.alert('Error', 'Please enter a room name');
      return;
    }

    if (!entryPrice || parseInt(entryPrice) < 0) {
      Alert.alert('Error', 'Please set a valid entry price');
      return;
    }

    setIsLoading(true);
    try {
      const roomData = {
        name: roomName,
        gameType: 'queen',
        entryFee: parseInt(entryPrice),
        maxPlayers: 2,
        currentPlayers: 1,
        isPrivate,
        videoEnabled,
        host: user?.id,
        players: [user?.id],
        spectators: [],
        status: 'waiting',
        shareLink: `https://connecteazzy.com/room/${Math.random().toString(36).substring(7)}`,
        createdAt: new Date(),
        // Women and hosts play for free
        freeEntry: user?.gender === 'female' || user?.isHostApproved,
      };

      const roomId = await createRoom(roomData);
      Alert.alert('Success', 'Queen room created successfully!');
      router.push(`/room/${roomId}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to create room. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#6A11CB', '#2575FC']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Create Queen Room</Text>
        </View>

        <ScrollView style={styles.form}>
          <View style={styles.infoCard}>
            <Crown size={32} color="#FFD700" />
            <Text style={styles.infoTitle}>Queen Room</Text>
            <Text style={styles.infoText}>
              • 1-on-1 private games{"\n"}
              • Set your own entry price{"\n"}
              • Video chat with your opponent{"\n"}
              • Keep 70% of all earnings
            </Text>
            {(user?.gender === 'female' || user?.isHostApproved) && (
              <Text style={styles.freeEntryNote}>
                {user?.gender === 'female' 
                  ? 'Women play for free!' 
                  : 'Hosts play for free!'}
              </Text>
            )}
          </View>

          <CustomInput
            placeholder="Room Name"
            value={roomName}
            onChangeText={setRoomName}
            style={styles.input}
          />

          <CustomInput
            placeholder="Entry Price (coins)"
            value={entryPrice}
            onChangeText={setEntryPrice}
            keyboardType="numeric"
            leftIcon={Coins}
            style={styles.input}
          />

          <View style={styles.switchContainer}>
            <View style={styles.switchLabel}>
              <Video size={20} color="#FFF" />
              <Text style={styles.switchText}>Enable Video Chat</Text>
            </View>
            <Switch 
              value={videoEnabled} 
              onValueChange={setVideoEnabled}
              thumbColor={videoEnabled ? '#4A90E2' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>

          <View style={styles.switchContainer}>
            <View style={styles.switchLabel}>
              <Lock size={20} color="#FFF" />
              <Text style={styles.switchText}>Private Room</Text>
            </View>
            <Switch 
              value={isPrivate} 
              onValueChange={setIsPrivate}
              thumbColor={isPrivate ? '#4A90E2' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>

          <CustomButton 
            title={isLoading ? "Creating Room..." : "Create Queen Room"} 
            onPress={createQueenRoom}
            gradient={['#FF9A8B', '#FF6A88']}
            loading={isLoading}
          />
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  form: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 20,
    backdropFilter: 'blur(10px)',
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 12,
    marginBottom: 8,
  },
  infoText: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 8,
  },
  freeEntryNote: {
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 8,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 0,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
  },
  switchLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    color: '#FFF',
    marginLeft: 8,
    fontWeight: '500',
  },
});