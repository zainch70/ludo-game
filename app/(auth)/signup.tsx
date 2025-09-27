import { useState } from 'react';
import { View, Text, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../utils/store';
import CustomInput from '.././components/CustomInput';
import CustomButton from '.././components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Phone, Lock, Eye, EyeOff, User, ChevronDown } from 'lucide-react-native';
import { ALLOWED_TEST_PHONE } from '../../utils/constants';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [useEmail, setUseEmail] = useState(false);
  const [gender, setGender] = useState('other');
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  const handleSignup = async () => {
    // Validate inputs
    if (!name) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    
    if (!useEmail && !phone) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    
    if (useEmail && !email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    
    if (!password) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }
    
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    // For testing purposes, only allow specific phone number
    if (!useEmail && phone !== ALLOWED_TEST_PHONE) {
      Alert.alert('Error', `Only test phone number ${ALLOWED_TEST_PHONE} is allowed during testing`);
      return;
    }

    setIsLoading(true);
    try {
      if (useEmail) {
        await signup(name, password, email, '', gender);
      } else {
        await signup(name, password, '', phone, gender);
      }
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Signup failed');
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
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join the ConnectEazzy community</Text>
        
        <View style={styles.form}>
          <CustomInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            leftIcon={User}
            style={styles.input}
          />
          
          <View style={styles.switchContainer}>
            <View style={styles.switchLabel}>
              {useEmail ? <Mail size={18} color="#FFF" /> : <Phone size={18} color="#FFF" />}
              <Text style={styles.switchText}>Use {useEmail ? 'Email' : 'Phone'} for Signup</Text>
            </View>
            <Switch 
              value={useEmail} 
              onValueChange={setUseEmail}
              thumbColor={useEmail ? '#4A90E2' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>
          
          {useEmail ? (
            <CustomInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              leftIcon={Mail}
              style={styles.input}
            />
          ) : (
            <CustomInput
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              leftIcon={Phone}
              style={styles.input}
            />
          )}
          
          <TouchableOpacity 
            style={[styles.input, styles.genderPicker]}
            onPress={() => setShowGenderPicker(!showGenderPicker)}
          >
            <Text style={styles.genderText}>
              Gender: {gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : 'Other'}
            </Text>
            <ChevronDown size={20} color="#FFF" />
          </TouchableOpacity>
          
          {showGenderPicker && (
            <View style={styles.genderOptions}>
              <TouchableOpacity 
                style={styles.genderOption}
                onPress={() => {
                  setGender('male');
                  setShowGenderPicker(false);
                }}
              >
                <Text style={styles.genderOptionText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.genderOption}
                onPress={() => {
                  setGender('female');
                  setShowGenderPicker(false);
                }}
              >
                <Text style={styles.genderOptionText}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.genderOption}
                onPress={() => {
                  setGender('other');
                  setShowGenderPicker(false);
                }}
              >
                <Text style={styles.genderOptionText}>Other</Text>
              </TouchableOpacity>
            </View>
          )}
          
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
          
          <CustomInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            leftIcon={Lock}
            rightIcon={showConfirmPassword ? EyeOff : Eye}
            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.input}
          />
          
          {!useEmail && (
            <Text style={styles.note}>
              Note: Only phone number {ALLOWED_TEST_PHONE} is allowed during testing
            </Text>
          )}
          
          <CustomButton 
            title={isLoading ? 'Creating Account...' : 'Sign Up'} 
            onPress={handleSignup}
            gradient={['#4FACFE', '#00F2FE']}
            loading={isLoading}
          />
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/(auth)/login" style={styles.link}>Login</Link>
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
  genderPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 8,
  },
  genderText: {
    color: '#FFF',
  },
  genderOptions: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  genderOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  genderOptionText: {
    color: '#FFF',
  },
  note: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 15,
    textAlign: 'center',
    fontStyle: 'italic',
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