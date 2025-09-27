import { useState } from 'react';
import { View, Text, Switch, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../utils/store';
import CustomInput from '.././components/CustomInput';
import CustomButton from '.././components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react-native';

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [useEmail, setUseEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(identifier, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Login failed');
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
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your ConnectEazzy account</Text>
        
        <View style={styles.form}>
          <View style={styles.switchContainer}>
            <View style={styles.switchLabel}>
              {useEmail ? <Mail size={18} color="#FFF" /> : <Phone size={18} color="#FFF" />}
              <Text style={styles.switchText}>Use {useEmail ? 'Email' : 'Phone'}</Text>
            </View>
            <Switch 
              value={useEmail} 
              onValueChange={setUseEmail}
              thumbColor={useEmail ? '#4A90E2' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>
          
          <CustomInput
            placeholder={useEmail ? 'Email Address' : 'Phone Number'}
            value={identifier}
            onChangeText={setIdentifier}
            keyboardType={useEmail ? 'email-address' : 'phone-pad'}
            leftIcon={useEmail ? Mail : Phone}
            style={styles.input}
          />
          
          <CustomInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            leftIcon={Lock}
            rightIcon={showPassword ? EyeOff : Eye}
            onRightIconPress={() => setShowPassword(!showPassword)}
            style={styles.input}
          />
          
          <CustomButton 
            title={isLoading ? 'Loading...' : 'Login'} 
            onPress={handleLogin}
            gradient={['#FF9A8B', '#FF6A88']}
            loading={isLoading}
          />
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/signup" style={styles.link}>Sign Up</Link>
          </View>
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
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 20,
    backdropFilter: 'blur(10px)',
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
  input: {
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: 'rgba(255,255,255,0.8)',
  },
  link: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});