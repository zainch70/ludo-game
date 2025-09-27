// Mock data for development and testing

export const ALLOWED_TEST_PHONE = '+1234567890';

export interface Friend {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'in-game';
  avatar?: string;
  lastSeen?: Date;
  coins?: number;
  level?: number;
}

export const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    status: 'online',
    coins: 850,
    level: 12,
    lastSeen: new Date()
  },
  {
    id: '2',
    name: 'Mike Chen',
    status: 'in-game',
    coins: 1200,
    level: 8,
    lastSeen: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
  },
  {
    id: '3',
    name: 'Emma Wilson',
    status: 'online',
    coins: 650,
    level: 15,
    lastSeen: new Date()
  },
  {
    id: '4',
    name: 'David Rodriguez',
    status: 'offline',
    coins: 420,
    level: 6,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    status: 'online',
    coins: 950,
    level: 10,
    lastSeen: new Date()
  }
];

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
  type: 'text' | 'image' | 'system';
}

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Sarah Johnson',
    text: 'Hey! Want to play a game?',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    type: 'text'
  },
  {
    id: '2',
    senderId: 'me',
    senderName: 'You',
    text: 'Sure! Let me finish this round first',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    type: 'text'
  },
  {
    id: '3',
    senderId: '1',
    senderName: 'Sarah Johnson',
    text: 'No problem! I\'ll create a room',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: 'text'
  },
  {
    id: '4',
    senderId: 'system',
    senderName: 'System',
    text: 'Sarah created a new Ludo room: "Quick Game"',
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    type: 'system'
  },
  {
    id: '5',
    senderId: 'me',
    senderName: 'You',
    text: 'Perfect! Joining now 🎲',
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
    type: 'text'
  }
];

export interface Room {
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
  createdAt: Date;
}

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Quick Ludo Match',
    host: 'user1',
    hostName: 'Sarah Johnson',
    maxPlayers: 4,
    currentPlayers: 2,
    entryFee: 100,
    isPrivate: false,
    status: 'waiting',
    gameType: 'ludo',
    players: ['user1', 'user2'],
    createdAt: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: '2',
    name: 'High Stakes Game',
    host: 'user3',
    hostName: 'Mike Chen',
    maxPlayers: 4,
    currentPlayers: 3,
    entryFee: 500,
    isPrivate: false,
    status: 'waiting',
    gameType: 'ludo',
    players: ['user3', 'user4', 'user5'],
    createdAt: new Date(Date.now() - 10 * 60 * 1000)
  },
  {
    id: '3',
    name: 'Queen\'s Tournament',
    host: 'user6',
    hostName: 'Emma Wilson',
    maxPlayers: 2,
    currentPlayers: 2,
    entryFee: 200,
    isPrivate: false,
    status: 'active',
    gameType: 'queen',
    players: ['user6', 'user7'],
    createdAt: new Date(Date.now() - 15 * 60 * 1000)
  },
  {
    id: '4',
    name: 'Private Friends Game',
    host: 'user8',
    hostName: 'David Rodriguez',
    maxPlayers: 4,
    currentPlayers: 1,
    entryFee: 50,
    isPrivate: true,
    status: 'waiting',
    gameType: 'ludo',
    players: ['user8'],
    createdAt: new Date(Date.now() - 2 * 60 * 1000)
  }
];

export const GAME_CONSTANTS = {
  MIN_ENTRY_FEE: 50,
  MAX_ENTRY_FEE: 1000,
  DEFAULT_ENTRY_FEE: 100,
  FREE_COINS_FOR_FEMALES: 1000,
  STARTING_COINS_MALE: 500,
  STARTING_COINS_FEMALE: 1000,
  MIN_COINS_TO_PLAY: 50,
  HOST_APPROVAL_THRESHOLD: 200,
  LEVEL_UP_THRESHOLD: 1000
};

export const ROOM_TYPES = {
  LUDO_2_PLAYER: '2-player',
  LUDO_5_PLAYER: '5-player',
  QUEEN_MATCH: 'queen'
};

export const GAME_MODES = {
  QUICK_PLAY: 'quick',
  CREATE_ROOM: 'create',
  JOIN_ROOM: 'join',
  LOCAL: 'local'
};

export const USER_ROLES = {
  PLAYER: 'player',
  HOST: 'host',
  ADMIN: 'admin'
};

export const COLORS = {
  PRIMARY: '#4A90E2',
  SECONDARY: '#6A11CB',
  SUCCESS: '#4CAF50',
  WARNING: '#FFC107',
  DANGER: '#dc3545',
  INFO: '#17a2b8',
  LIGHT: '#f8f9fa',
  DARK: '#343a40'
};

export const GRADIENTS = {
  PRIMARY: ['#6A11CB', '#2575FC'],
  SECONDARY: ['#FF9A8B', '#FF6A88'],
  SUCCESS: ['#4FACFE', '#00F2FE'],
  WARM: ['#FFB75E', '#ED8F03'],
  COOL: ['#667eea', '#764ba2']
};
