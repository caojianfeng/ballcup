import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
// 添加游戏引擎1/2
import { GameEngine } from "react-native-game-engine";
// 添加Ball 1/3
import Ball from './Ball';

// 添加Walls 1/3
import Wall from './Wall';

const createObject = (x, y) => ({ position: { x: x, y: y } });

// 添加Ball 2/3
const { width, height } = Dimensions.get("screen");
const ballSize = Math.trunc(Math.max(width, height) * 0.075);
const ball = createObject(width / 2, height / 2);

// 添加Walls 2/3
const wallColor = "#335"
const wallSize = ballSize * 0.5;
const floor = createObject(width / 2, height - wallSize / 2);
const leftwall = createObject(wallSize / 2, height / 2);
const rightwall = createObject(width - wallSize / 2, height / 2);


export default function App() {
  // 添加游戏引擎2/2
  return (
    <GameEngine
      style={styles.container}
      entities={{
        // 添加Ball 3/3
        ball: {
          body: ball,
          size: [ballSize, ballSize],
          color: '#f93',
          renderer: Ball
        },
        // 添加Walls 3/3
        leftwall: {
          body: leftwall,
          size: [wallSize, height],
          color: wallColor,
          renderer: Wall
        },
        rightwall: {
          body: rightwall,
          size: [wallSize, height],
          color: wallColor,
          renderer: Wall
        },
        floor: {
          body: floor,
          size: [width, wallSize],
          color: wallColor,
          renderer: Wall
        }
      }} >
      <StatusBar hidden={true} />
    </ GameEngine>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#669',
  },
});
