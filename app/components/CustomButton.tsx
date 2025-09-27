import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  style?: object;
  gradient?: string[];
  loading?: boolean;
  icon?: LucideIcon;
}


export default function CustomButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  style,
  gradient,
  loading = false,
  icon: Icon
}: CustomButtonProps) {
  const ButtonContent = () => (
    <>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#4A90E2'} />
      ) : (
        <>
          {Icon && <Icon size={20} color={variant === 'primary' ? '#fff' : '#4A90E2'} style={styles.icon} />}
          <Text style={[
            styles.text,
            variant === 'primary' ? styles.primaryText : styles.outlineText
          ]}>
            {title}
          </Text>
        </>
      )}
    </>
  );

  if (gradient && variant === 'primary') {
    return (
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={onPress}
        disabled={loading}
      >
        <LinearGradient
          colors={gradient as [string, string, ...string[]]}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <ButtonContent />
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.outlineButton,
        style
      ]}
      onPress={onPress}
      disabled={loading}
    >
      <ButtonContent />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    minHeight: 50,
  },
  gradientButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4A90E2',
    padding: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 8,
  },
  primaryText: {
    color: '#fff',
  },
  outlineText: {
    color: '#4A90E2',
  },
});