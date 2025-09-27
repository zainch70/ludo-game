import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../utils/store';
import Sidebar from '../components/Sidebar';
import { Menu, Coins, Trophy, Users, Gamepad, DoorOpen, Crown, User, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Mock data for demonstration
  const leaderboardData = [
    { id: 1, name: 'Alex Johnson', rank: 1, points: 2450 },
    { id: 2, name: 'Maria Garcia', rank: 2, points: 2310 },
    { id: 3, name: 'You', rank: 3, points: 2150 },
  ];

  const activeFriends = [
    { id: 1, name: 'Sarah M.', status: 'Online', game: 'Ludo' },
    { id: 2, name: 'Mike T.', status: 'In game', game: 'Ludo' },
    { id: 3, name: 'Emma L.', status: 'Online', game: 'Menu' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#6A11CB', '#2575FC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
            <Menu size={24} color="#FFF" />
          </TouchableOpacity>
          
          <View style={styles.userInfo}>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.username}>{user?.name || 'Player'}</Text>
            <View style={styles.levelContainer}>
              <Text style={styles.level}>Level {user?.level || 1}</Text>
              <View style={styles.xpBar}>
                <View style={styles.xpProgress} />
              </View>
            </View>
          </View>
          
          <TouchableOpacity onPress={() => router.push('/coins')} style={styles.coinButton}>
            <Coins size={20} color="#FFD700" />
            <Text style={styles.coinText}>{user?.coins || 0}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/ludo-menu')}
          >
            <LinearGradient
              colors={['#FF9A8B', '#FF6A88']}
              style={styles.actionButtonGradient}
            >
              <Gamepad size={28} color="#FFF" />
              <Text style={styles.actionText}>Play Ludo</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/rooms')}
          >
            <LinearGradient
              colors={['#4FACFE', '#00F2FE']}
              style={styles.actionButtonGradient}
            >
              <DoorOpen size={28} color="#FFF" />
              <Text style={styles.actionText}>Join Room</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Leaderboard Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Trophy size={22} color="#FFC107" />
              <Text style={styles.sectionTitleText}>Weekly Leaderboard</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {leaderboardData.map((item, index) => (
            <View key={item.id} style={styles.leaderboardItem}>
              <View style={styles.rankContainer}>
                {item.rank === 1 ? (
                  <Crown size={16} color="#FFD700" />
                ) : (
                  <Text style={styles.rank}>{item.rank}</Text>
                )}
              </View>
              <View style={styles.playerInfo}>
                <View style={styles.avatar}>
                  <User size={16} color="#6A11CB" />
                </View>
                <Text style={[styles.playerName, item.name === 'You' && styles.highlightedText]}>
                  {item.name}
                </Text>
              </View>
              <Text style={styles.points}>{item.points} pts</Text>
            </View>
          ))}
        </View>

        {/* Active Friends */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Zap size={22} color="#4CAF50" />
              <Text style={styles.sectionTitleText}>Active Friends</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {activeFriends.map((friend) => (
            <View key={friend.id} style={styles.friendItem}>
              <View style={styles.friendInfo}>
                <View style={[styles.avatar, styles.friendAvatar]}>
                  <User size={16} color="#FFF" />
                </View>
                <View>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.friendStatus}>{friend.status} • {friend.game}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.inviteButton}>
                <Text style={styles.inviteText}>Invite</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sidebar */}
      <Sidebar 
        visible={sidebarVisible} 
        onClose={() => setSidebarVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    padding: 8,
  },
  userInfo: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 16,
  },
  welcome: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 4,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  levelContainer: {
    alignItems: 'center',
    width: '100%',
  },
  level: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  xpBar: {
    width: '80%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  xpProgress: {
    width: '65%',
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  coinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  coinText: {
    marginLeft: 6,
    fontWeight: 'bold',
    color: '#FFF',
  },
  content: {
    flex: 1,
    padding: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
    marginLeft: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    marginHorizontal: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  actionText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 12,
  },
  section: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginLeft: 8,
  },
  viewAll: {
    color: '#6A11CB',
    fontSize: 12,
    fontWeight: '500',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F9',
  },
  rankContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  rank: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#718096',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  playerName: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
  },
  highlightedText: {
    color: '#6A11CB',
    fontWeight: 'bold',
  },
  points: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A5568',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F9',
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  friendAvatar: {
    backgroundColor: '#6A11CB',
  },
  friendName: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
    marginBottom: 2,
  },
  friendStatus: {
    fontSize: 12,
    color: '#718096',
  },
  inviteButton: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  inviteText: {
    fontSize: 12,
    color: '#4A5568',
    fontWeight: '500',
  },
});