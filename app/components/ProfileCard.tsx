import { View, Text, Image, StyleSheet } from 'react-native';

interface Profile {
  id: string;
  name: string;
  bio?: string;
  interests?: string[];
  image?: string;
  isVerified?: boolean;
  coins?: number;
}

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <View style={styles.container}>
      {profile.image ? (
        <Image source={{ uri: profile.image }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>
            {profile.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
      
      <View style={styles.info}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{profile.name}</Text>
          {profile.isVerified && (
            <Text style={styles.verified}>✓</Text>
          )}
        </View>
        
        {profile.bio && (
          <Text style={styles.bio} numberOfLines={1}>{profile.bio}</Text>
        )}
        
        {profile.interests && profile.interests.length > 0 && (
          <Text style={styles.interests} numberOfLines={1}>
            {profile.interests.join(', ')}
          </Text>
        )}
        
        {profile.coins !== undefined && (
          <Text style={styles.coins}>{profile.coins} coins</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  placeholderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  info: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  verified: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  interests: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  coins: {
    fontSize: 12,
    color: '#FFD700',
    marginTop: 4,
    fontWeight: 'bold',
  },
});