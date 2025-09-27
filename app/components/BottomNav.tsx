import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Dice1, Home, Crown } from 'lucide-react-native';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: Dice1, label: 'Ludo', route: '/ludo' },
    { icon: Home, label: 'All Rooms', route: '/all-rooms' },
    { icon: Crown, label: 'Pro Host', route: '/pro-host' },
  ];

  const isActive = (route: string) => pathname === route;

  return (
    <View style={styles.container}>
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const active = isActive(item.route);
        
        return (
          <TouchableOpacity
            key={index}
            style={[styles.navItem, active && styles.activeNavItem]}
            onPress={() => router.push(item.route)}
          >
            <Icon size={20} color={active ? '#4A90E2' : '#6c757d'} />
            <Text style={[styles.navText, active && styles.activeNavText]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  activeNavItem: {
    backgroundColor: '#e8f4fd',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#6c757d',
  },
  activeNavText: {
    color: '#4A90E2',
    fontWeight: '500',
  },
});