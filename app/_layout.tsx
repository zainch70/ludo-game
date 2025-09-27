import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../utils/store';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="chat/[friendId]" options={{ title: 'Chat' }} />
          <Stack.Screen name="room/[roomId]" options={{ title: 'Room' }} />
          <Stack.Screen name="room/create" options={{ title: 'Create Room' }} />
          <Stack.Screen name="room/join" options={{ title: 'Join Room' }} />
          <Stack.Screen name="ludo/game/[players]" options={{ title: 'Ludo Game' }} />
          // ... existing routes ...

       <Stack.Screen name="ludo/index" options={{ headerShown: false }} />
         <Stack.Screen name="ludo/create-room" options={{ headerShown: false }} />
      <Stack.Screen name="ludo/join-room" options={{ headerShown: false }} />
      <Stack.Screen name="ludo/game-room" options={{ headerShown: false }} />
       <Stack.Screen name="ludo/quick-play" options={{ headerShown: false }} />

// ... existing routes ...
        </>
      )}
    </Stack>
  );
}