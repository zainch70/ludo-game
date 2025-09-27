import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onRightIconPress?: () => void;
  style?: object;
}

export default function CustomInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onRightIconPress,
  style,
}: CustomInputProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        {LeftIcon && (
          <View style={styles.leftIconContainer}>
            <LeftIcon size={20} color="#666" />
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            error && styles.inputError,
            LeftIcon && styles.inputWithLeftIcon,
            RightIcon && styles.inputWithRightIcon,
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
        {RightIcon && (
          <TouchableOpacity 
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
          >
            <RightIcon size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  inputWithLeftIcon: {
    paddingLeft: 10,
  },
  inputWithRightIcon: {
    paddingRight: 10,
  },
  leftIconContainer: {
    paddingLeft: 15,
    paddingRight: 10,
  },
  rightIconContainer: {
    paddingRight: 15,
    paddingLeft: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
});