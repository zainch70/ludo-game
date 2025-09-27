// components/LudoGame.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, PanResponder, Animated } from 'react-native';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

interface Player {
  id: number;
  color: string;
  pieces: number[];
  homePosition: { x: number; y: number }[];
}

interface LudoGameProps {
  roomId: string;
  players: any[];
  currentPlayerId: string;
  onMove: (pieceId: number, steps: number) => void;
  onRollDice: () => void;
}

const LudoGame: React.FC<LudoGameProps> = ({ roomId, players, currentPlayerId, onMove, onRollDice }) => {
  const [diceValue, setDiceValue] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  
  // Game board dimensions
  const boardSize = 300;
  const cellSize = boardSize / 15;
  
  // Player colors
  const playerColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
  
  // Initial player positions
  const initialPlayers: Player[] = [
    {
      id: 0,
      color: playerColors[0],
      pieces: [0, 0, 0, 0],
      homePosition: [
        { x: 3 * cellSize, y: 3 * cellSize },
        { x: 6 * cellSize, y: 3 * cellSize },
        { x: 3 * cellSize, y: 6 * cellSize },
        { x: 6 * cellSize, y: 6 * cellSize }
      ]
    },
    // Add other players...
  ];

  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value);
    onRollDice();
  };

  const movePiece = (pieceId: number) => {
    if (diceValue > 0 && selectedPiece === null) {
      setSelectedPiece(pieceId);
      onMove(pieceId, diceValue);
    }
  };

  const renderGameBoard = () => {
    return (
      <Svg width={boardSize} height={boardSize}>
        {/* Board background */}
        <Rect
          x={0}
          y={0}
          width={boardSize}
          height={boardSize}
          fill="#f0f0f0"
          stroke="#000"
          strokeWidth={2}
        />
        
        {/* Player homes */}
        {initialPlayers.map((player, index) => (
          <Rect
            key={index}
            x={index % 2 === 0 ? 0 : boardSize / 2}
            y={index < 2 ? 0 : boardSize / 2}
            width={boardSize / 2}
            height={boardSize / 2}
            fill={player.color}
            opacity={0.3}
          />
        ))}
        
        {/* Player pieces */}
        {initialPlayers.map((player, playerIndex) =>
          player.pieces.map((position, pieceIndex) => (
            <Circle
              key={`${playerIndex}-${pieceIndex}`}
              cx={player.homePosition[pieceIndex].x}
              cy={player.homePosition[pieceIndex].y}
              r={cellSize / 2 - 2}
              fill={player.color}
              onPress={() => movePiece(pieceIndex)}
            />
          ))
        )}
        
        {/* Paths */}
        <Path
          d="M7.5,7.5 H22.5 V22.5 H7.5 Z"
          fill="none"
          stroke="#000"
          strokeWidth={1}
        />
      </Svg>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Ludo Game - Room: {roomId}</Text>
      
      {/* Game board */}
      {renderGameBoard()}
      
      {/* Dice */}
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>Dice: {diceValue}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#4A90E2',
            padding: 15,
            borderRadius: 8,
            marginTop: 10
          }}
          onPress={rollDice}
          disabled={diceValue > 0}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Roll Dice</Text>
        </TouchableOpacity>
      </View>
      
      {/* Game info */}
      <View>
        <Text>Current Player: {players[currentPlayer]?.name}</Text>
        <Text>Your Pieces: {initialPlayers[0].pieces.join(', ')}</Text>
      </View>
    </View>
  );
};

export default LudoGame;