import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../utils/store';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { LinearGradient } from 'expo-linear-gradient';
import { Crown, ArrowLeft } from 'lucide-react-native';

export default function HostRequestScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitRequest = async () => {
    if (!reason.trim()) {
      Alert.alert('Error', 'Please provide a reason for becoming a host');
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, this would call an API to submit the request
      Alert.alert('Success', 'Your host request has been submitted for approval');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#6A11CB', '#2575FC']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Become a Host</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.infoCard}>
            <Crown size={32} color="#FFD700" />
            <Text style={styles.infoTitle}>Host Benefits</Text>
            <Text style={styles.infoText}>
              • Free entry to all games{"\n"}
              • Earn commissions from games{"\n"}
              • Create and manage game rooms{"\n"}
              • Special host badges and recognition
            </Text>
          </View>

          <Text style={styles.label}>Why do you want to become a host?</Text>
          <CustomInput
            placeholder="Explain why you'd make a good host..."
            value={reason}
            onChangeText={setReason}
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />

          <CustomButton 
            title={isLoading ? "Submitting..." : "Submit Request"} 
            onPress={submitRequest}
            gradient={['#4FACFE', '#00F2FE']}
            loading={isLoading}
          />
        </View>
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
  },
  label: {
    color: '#FFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
});