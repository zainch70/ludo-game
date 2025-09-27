import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../utils/store';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Home, Users, Trophy, Settings, X, User, LogOut, 
  Gamepad, Coins, Crown, ChevronRight
} from 'lucide-react-native';

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
}

export default function Sidebar({ visible, onClose }: SidebarProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Home', route: '/' },
    { icon: Users, label: 'Friends', route: '/friends' },
    { icon: Gamepad, label: 'Game Rooms', route: '/rooms' },
    { icon: Trophy, label: 'Leaderboard', route: '/leaderboard' },
    { icon: Coins, label: 'Coin Rewards', route: '/coins' },
    { icon: Settings, label: 'Settings', route: '/settings' },
  ];

  const handleNavigation = (route: string) => {
    onClose();
    router.push(route);
  };

  const handleLogout = () => {
    onClose();
    logout();
    router.replace('/login');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />
        
        <View style={styles.sidebar}>
          <LinearGradient
            colors={['#6A11CB', '#2575FC']}
            style={styles.header}
          >
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <User size={32} color="#FFF" />
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user?.name || 'User'}</Text>
                <View style={styles.userStats}>
                  <View style={styles.statItem}>
                    <Coins size={14} color="#FFD700" />
                    <Text style={styles.statText}>{user?.coins || 0}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Crown size={14} color="#FFD700" />
                    <Text style={styles.statText}>Level {user?.level || 1}</Text>
                  </View>
                </View>
              </View>
            </View>
            
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#FFF" />
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.menu}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => handleNavigation(item.route)}
                >
                  <View style={styles.menuItemLeft}>
                    <Icon size={20} color="#4A90E2" />
                    <Text style={styles.menuText}>{item.label}</Text>
                  </View>
                  <ChevronRight size={16} color="#6c757d" />
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#dc3545" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouchable: {
    flex: 1,
  },
  sidebar: {
    width: '85%',
    height: '100%',
    backgroundColor: '#FFF',
    position: 'absolute',
    right: 0,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  userStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  menu: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#343a40',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 'auto',
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f3f5',
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#dc3545',
    fontWeight: '500',
  },
});