import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Room interface
interface Room {
  id: string;
  name: string;
  host: string;
  hostName: string;
  maxPlayers: number;
  currentPlayers: number;
  entryFee: number;
  isPrivate: boolean;
  status: 'waiting' | 'active' | 'completed';
  gameType: 'ludo' | 'queen';
  players: string[];
  createdAt: any;
}

// Create a new room
export const createRoom = async (roomData: Omit<Room, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'rooms'), {
      ...roomData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};

// Get all rooms
export const getRooms = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'rooms'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Room[];
  } catch (error) {
    console.error('Error getting rooms:', error);
    throw error;
  }
};

// Get rooms by status
export const getRoomsByStatus = async (status: 'waiting' | 'active' | 'completed') => {
  try {
    const q = query(
      collection(db, 'rooms'), 
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Room[];
  } catch (error) {
    console.error('Error getting rooms by status:', error);
    throw error;
  }
};

// Subscribe to rooms real-time updates
export const subscribeToRooms = (callback: (rooms: Room[]) => void) => {
  const q = query(collection(db, 'rooms'), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const rooms = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Room[];
    callback(rooms);
  });
};

// Join a room
export const joinRoom = async (roomId: string, userId: string, userName: string) => {
  try {
    const roomRef = doc(db, 'rooms', roomId);
    const roomSnap = await getDoc(roomRef);
    
    if (!roomSnap.exists()) {
      throw new Error('Room not found');
    }
    
    const roomData = roomSnap.data() as Room;
    
    if (roomData.currentPlayers >= roomData.maxPlayers) {
      throw new Error('Room is full');
    }
    
    if (roomData.players.includes(userId)) {
      throw new Error('Already joined this room');
    }
    
    await updateDoc(roomRef, {
      currentPlayers: roomData.currentPlayers + 1,
      players: [...roomData.players, userId]
    });
    
    return true;
  } catch (error) {
    console.error('Error joining room:', error);
    throw error;
  }
};

// Leave a room
export const leaveRoom = async (roomId: string, userId: string) => {
  try {
    const roomRef = doc(db, 'rooms', roomId);
    const roomSnap = await getDoc(roomRef);
    
    if (!roomSnap.exists()) {
      throw new Error('Room not found');
    }
    
    const roomData = roomSnap.data() as Room;
    
    await updateDoc(roomRef, {
      currentPlayers: Math.max(0, roomData.currentPlayers - 1),
      players: roomData.players.filter(id => id !== userId)
    });
    
    return true;
  } catch (error) {
    console.error('Error leaving room:', error);
    throw error;
  }
};

// Delete a room
export const deleteRoom = async (roomId: string) => {
  try {
    await deleteDoc(doc(db, 'rooms', roomId));
    return true;
  } catch (error) {
    console.error('Error deleting room:', error);
    throw error;
  }
};

// Host request functions
export const submitHostRequest = async (userId: string, reason: string) => {
  try {
    await addDoc(collection(db, 'hostRequests'), {
      userId,
      reason,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error submitting host request:', error);
    throw error;
  }
};

export const getHostRequests = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'hostRequests'), orderBy('createdAt', 'desc'))
    );
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting host requests:', error);
    throw error;
  }
};

export const approveHostRequest = async (requestId: string, userId: string) => {
  try {
    // Update request status
    await updateDoc(doc(db, 'hostRequests', requestId), {
      status: 'approved'
    });
    
    // Update user's host status
    await updateDoc(doc(db, 'users', userId), {
      isHostApproved: true
    });
    
    return true;
  } catch (error) {
    console.error('Error approving host request:', error);
    throw error;
  }
};

export const rejectHostRequest = async (requestId: string) => {
  try {
    await updateDoc(doc(db, 'hostRequests', requestId), {
      status: 'rejected'
    });
    return true;
  } catch (error) {
    console.error('Error rejecting host request:', error);
    throw error;
  }
};

export default {
  createRoom,
  getRooms,
  getRoomsByStatus,
  subscribeToRooms,
  joinRoom,
  leaveRoom,
  deleteRoom,
  submitHostRequest,
  getHostRequests,
  approveHostRequest,
  rejectHostRequest
};
