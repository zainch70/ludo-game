import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useAuth } from '../../utils/store';
import { LinearGradient } from 'expo-linear-gradient';
import { LogOut, Bell, Shield, Moon, Globe, HelpCircle, User } from 'lucide-react-native';

export default function SettingsScreen() {
  const { logout, user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  const settingsSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Edit Profile', action: () => console.log('Edit Profile') },
        { label: 'Change Password', action: () => console.log('Change Password') },
        { label: 'Privacy Settings', action: () => console.log('Privacy Settings') },
      ],
    },
    {
      title: 'Preferences',
      icon: Bell,
      items: [
        {
          label: 'Notifications',
          action: () => setNotifications(!notifications),
          component: (
            <Switch
              value={notifications}
              onValueChange={(value) => setNotifications(value)}
              thumbColor={notifications ? '#4A90E2' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          ),
        },
        {
          label: 'Dark Mode',
          action: () => setDarkMode(!darkMode),
          component: (
            <Switch
              value={darkMode}
              onValueChange={(value) => setDarkMode(value)}
              thumbColor={darkMode ? '#4A90E2' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          ),
        },
      ],
    },
    {
      title: 'Support',
      icon: HelpCircle,
      items: [
        { label: 'Help Center', action: () => console.log('Help Center') },
        { label: 'Contact Us', action: () => console.log('Contact Us') },
        { label: 'About ConnectEazzy', action: () => console.log('About') },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6A11CB', '#2575FC']}
        style={styles.header}
      >
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your account preferences</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {settingsSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <View key={sectionIndex} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Icon size={20} color="#4A90E2" />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              
              <View style={styles.sectionContent}>
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    style={styles.settingItem}
                    onPress={item.action}
                  >
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    {item.component || <View style={styles.chevron} />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <LogOut size={20} color="#dc3545" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
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
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#343a40',
  },
  sectionContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  settingLabel: {
    fontSize: 16,
    color: '#343a40',
  },
  chevron: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#6c757d',
    transform: [{ rotate: '45deg' }],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    color: '#dc3545',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});