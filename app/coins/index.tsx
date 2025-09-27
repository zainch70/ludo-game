import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Coins, Crown, Gift, Star, Trophy, UserCheck, Users } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../utils/store';

const { width } = Dimensions.get('window');

export default function CoinScreen() {
  const router = useRouter();
  const { user, addCoins } = useAuth();
  const [lastClaimed, setLastClaimed] = useState<Date | null>(null);
  const [canClaim, setCanClaim] = useState(true);
  const [progressAnim] = useState(new Animated.Value(0));
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Check if user can claim daily reward
  useEffect(() => {
    // Simulate checking last claim date
    const today = new Date().toDateString();
    const lastClaim = lastClaimed ? lastClaimed.toDateString() : null;
    setCanClaim(today !== lastClaim);
  }, [lastClaimed]);

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: canClaim ? 0 : 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [canClaim]);

  const claimDailyReward = () => {
    if (canClaim) {
      // Animate button press
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      addCoins(50); // Add 50 coins as daily reward
      setLastClaimed(new Date());
      setCanClaim(false);
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const rewards = [
    { day: 1, coins: 10, claimed: true },
    { day: 2, coins: 15, claimed: true },
    { day: 3, coins: 20, claimed: true },
    { day: 4, coins: 25, claimed: false },
    { day: 5, coins: 30, claimed: false },
    { day: 6, coins: 40, claimed: false },
    { day: 7, coins: 50, claimed: false },
  ];

  const waysToEarn = [
    { task: 'Invite a friend', coins: 100, icon: Users },
    { task: 'Complete your profile', coins: 50, icon: UserCheck },
    { task: 'Join a room', coins: 10, icon: Coins },
    { task: 'Create a room', coins: 20, icon: Crown },
    { task: 'Win a game', coins: 30, icon: Trophy },
  ];

  return (
    <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Coin Rewards</Text>
        <View style={styles.coinBalance}>
          <Coins size={20} color="#FFD700" />
          <Text style={styles.coinText}>{user?.coins || 0}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Daily Reward Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>Daily Reward</Text>
          </View>
          
          <LinearGradient colors={['#4A00E0', '#8E2DE2']} style={styles.dailyRewardCard}>
            <View style={styles.rewardIconContainer}>
              <Gift size={48} color="#FFF" />
              <View style={styles.starBackground} />
            </View>
            <Text style={styles.rewardAmount}>+50 coins</Text>
            <Text style={styles.rewardText}>Claim your daily reward!</Text>
            
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                style={[styles.claimButton, !canClaim && styles.claimButtonDisabled]}
                onPress={claimDailyReward}
                disabled={!canClaim}
              >
                <LinearGradient 
                  colors={canClaim ? ['#FFD700', '#FFA500'] : ['#6c757d', '#495057']}
                  style={styles.claimButtonGradient}
                >
                  <Text style={styles.claimButtonText}>
                    {canClaim ? 'Claim Reward' : 'Already Claimed'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
            
            {!canClaim && lastClaimed && (
              <View style={styles.progressContainer}>
                <Text style={styles.nextRewardText}>
                  Next reward available in {24 - new Date().getHours()} hours
                </Text>
                <View style={styles.progressBar}>
                  <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
                </View>
              </View>
            )}
          </LinearGradient>
        </View>

        {/* Weekly Streak Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Crown size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>Weekly Streak</Text>
          </View>
          
          <View style={styles.weeklyGrid}>
            {rewards.map((reward) => (
              <LinearGradient
                key={reward.day}
                colors={reward.claimed ? ['#FFD700', '#FFA500'] : ['#495057', '#6c757d']}
                style={[styles.rewardDay, reward.day === 4 && styles.currentRewardDay]}
              >
                <Text style={styles.dayText}>Day {reward.day}</Text>
                <View style={styles.coinContainer}>
                  <Coins size={16} color={reward.claimed ? '#FFF' : '#adb5bd'} />
                  <Text style={[
                    styles.dayCoins,
                    reward.claimed && styles.dayCoinsClaimed
                  ]}>
                    +{reward.coins}
                  </Text>
                </View>
                {reward.claimed && (
                  <View style={styles.claimedBadge}>
                    <Star size={12} color="#FFF" fill="#FFF" />
                  </View>
                )}
              </LinearGradient>
            ))}
          </View>
        </View>

        {/* Ways to Earn Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Trophy size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>Ways to Earn</Text>
          </View>
          
          {waysToEarn.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <View key={index} style={styles.earnItem}>
                <View style={styles.earnTaskContainer}>
                  <View style={styles.iconCircle}>
                    <IconComponent size={16} color="#FFD700" />
                  </View>
                  <Text style={styles.earnTask}>{item.task}</Text>
                </View>
                <View style={styles.earnCoins}>
                  <Coins size={14} color="#FFD700" />
                  <Text style={styles.earnCoinsText}>+{item.coins}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  coinBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.5)',
  },
  coinText: {
    marginLeft: 6,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#FFF',
  },
  dailyRewardCard: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  rewardIconContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  starBackground: {
    position: 'absolute',
    top: -15,
    left: -15,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  rewardAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 8,
  },
  rewardText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    marginBottom: 20,
  },
  claimButton: {
    borderRadius: 25,
    overflow: 'hidden',
    width: '100%',
  },
  claimButtonGradient: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  claimButtonDisabled: {
    opacity: 0.8,
  },
  claimButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  progressContainer: {
    width: '100%',
    marginTop: 16,
    alignItems: 'center',
  },
  nextRewardText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  weeklyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  rewardDay: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    width: (width - 64) / 4,
    marginBottom: 12,
    position: 'relative',
  },
  currentRewardDay: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  dayText: {
    fontSize: 12,
    color: '#FFF',
    marginBottom: 6,
    fontWeight: '500',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayCoins: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 4,
  },
  dayCoinsClaimed: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  claimedBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earnItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  earnTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  earnTask: {
    fontSize: 15,
    color: '#FFF',
  },
  earnCoins: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  earnCoinsText: {
    marginLeft: 4,
    color: '#FFD700',
    fontWeight: 'bold',
  },
});