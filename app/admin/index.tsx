import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../utils/store';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, AlertCircle, UserCheck, UserX, Users, Flag } from 'lucide-react-native';
import { 
  getAllUsers, 
  getReports, 
  getHostRequests, 
  updateUser, 
  updateReport, 
  updateHostRequest 
} from '../../utils/api';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  gender: 'male' | 'female' | 'other';
  coins: number;
  isHost: boolean;
  isHostApproved: boolean;
  level: number;
  wins: number;
  losses: number;
  active?: boolean;
}

interface Report {
  id: string;
  userId: string;
  reportedUserId: string;
  reason: string;
  status: string;
  createdAt: any;
}

interface HostRequest {
  id: string;
  userId: string;
  userName: string;
  reason: string;
  status: string;
  requestedAt: any;
}

export default function AdminScreen() {
  const { user: adminUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [hostRequests, setHostRequests] = useState<HostRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'reports' | 'requests'>('users');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      if (activeTab === 'users') {
        const usersData = await getAllUsers();
        setUsers(usersData as User[]);
      } else if (activeTab === 'reports') {
        const reportsData = await getReports();
        setReports(reportsData as Report[]);
      } else if (activeTab === 'requests') {
        const requestsData = await getHostRequests();
        setHostRequests(requestsData as HostRequest[]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await updateUser(userId, { active: !currentStatus });
      setUsers(users.map(user => 
        user.id === userId ? { ...user, active: !currentStatus } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
      Alert.alert('Error', 'Failed to update user status');
    }
  };

  const handleReport = async (reportId: string, status: string) => {
    try {
      if (!adminUser) return;
      
      await updateReport(reportId, status, adminUser.id);
      setReports(reports.filter(report => report.id !== reportId));
      Alert.alert('Success', `Report ${status}`);
    } catch (error) {
      console.error('Error handling report:', error);
      Alert.alert('Error', 'Failed to process report');
    }
  };

  const handleHostRequest = async (requestId: string, status: string) => {
    try {
      if (!adminUser) return;
      
      const request = hostRequests.find(r => r.id === requestId);
      if (!request) return;
      
      await updateHostRequest(requestId, status, adminUser.id);
      
      if (status === 'approved') {
        await updateUser(request.userId, { isHostApproved: true, isHost: true });
      }
      
      setHostRequests(hostRequests.filter(req => req.id !== requestId));
      Alert.alert('Success', `Host request ${status}`);
    } catch (error) {
      console.error('Error handling host request:', error);
      Alert.alert('Error', 'Failed to process host request');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6A11CB', '#2575FC']}
        style={styles.header}
      >
        <Text style={styles.title}>Admin Dashboard</Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'users' && styles.activeTab]}
            onPress={() => setActiveTab('users')}
          >
            <Users size={18} color={activeTab === 'users' ? '#FFF' : 'rgba(255,255,255,0.7)'} />
            <Text style={[styles.tabText, activeTab === 'users' && styles.activeTabText]}>
              Users
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'reports' && styles.activeTab]}
            onPress={() => setActiveTab('reports')}
          >
            <Flag size={18} color={activeTab === 'reports' ? '#FFF' : 'rgba(255,255,255,0.7)'} />
            <Text style={[styles.tabText, activeTab === 'reports' && styles.activeTabText]}>
              Reports
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
            onPress={() => setActiveTab('requests')}
          >
            <Shield size={18} color={activeTab === 'requests' ? '#FFF' : 'rgba(255,255,255,0.7)'} />
            <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
              Requests
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {activeTab === 'users' ? (
        <View style={styles.section}>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.userEmail}>{item.email}</Text>
                  <Text style={styles.userStats}>
                    {item.coins} coins • Level {item.level}
                  </Text>
                </View>
                <View style={styles.userActions}>
                  <Switch
                    value={item.active !== false}
                    onValueChange={() => toggleUserStatus(item.id, item.active !== false)}
                    thumbColor={item.active !== false ? '#4CAF50' : '#f4f3f4'}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                  />
                  {item.active !== false ? (
                    <UserCheck size={20} color="#4CAF50" style={styles.statusIcon} />
                  ) : (
                    <UserX size={20} color="#f44336" style={styles.statusIcon} />
                  )}
                </View>
              </View>
            )}
            contentContainerStyle={styles.list}
          />
        </View>
      ) : activeTab === 'reports' ? (
        <View style={styles.section}>
          <FlatList
            data={reports}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.reportItem}>
                <View style={styles.reportHeader}>
                  <AlertCircle size={16} color="#f44336" />
                  <Text style={styles.reportTitle}>Report #{item.id.substring(0, 8)}</Text>
                </View>
                <Text style={styles.reportText}>{item.reason}</Text>
                <Text style={styles.reportDate}>
                  {item.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown date'}
                </Text>
                <View style={styles.reportActions}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.approveButton]}
                    onPress={() => handleReport(item.id, 'approved')}
                  >
                    <Text style={styles.actionButtonText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.rejectButton]}
                    onPress={() => handleReport(item.id, 'rejected')}
                  >
                    <Text style={styles.actionButtonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={styles.list}
          />
        </View>
      ) : (
        <View style={styles.section}>
          <FlatList
            data={hostRequests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.requestItem}>
                <View style={styles.requestHeader}>
                  <Shield size={16} color="#4A90E2" />
                  <Text style={styles.requestTitle}>Request from {item.userName}</Text>
                </View>
                <Text style={styles.requestText}>{item.reason}</Text>
                <Text style={styles.requestDate}>
                  {item.requestedAt?.toDate?.()?.toLocaleDateString() || 'Unknown date'}
                </Text>
                <View style={styles.requestActions}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.approveButton]}
                    onPress={() => handleHostRequest(item.id, 'approved')}
                  >
                    <Text style={styles.actionButtonText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.rejectButton]}
                    onPress={() => handleHostRequest(item.id, 'rejected')}
                  >
                    <Text style={styles.actionButtonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={styles.list}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  tabText: {
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 6,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  section: {
    flex: 1,
    padding: 16,
  },
  list: {
    paddingBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  userStats: {
    fontSize: 12,
    color: '#6c757d',
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginLeft: 10,
  },
  reportItem: {
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
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#343a40',
  },
  reportText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  reportDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  reportActions: {
    flexDirection: 'row',
    gap: 8,
  },
  requestItem: {
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
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#343a40',
  },
  requestText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  requestDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: '500',
  },
});