# 准备：
1. 安装RN开发环境
安装RN的文章资料应该满世界都有，这里就不重复了。

2. 安装expo
```bash
yarn global add expo-cli
```

# 创建：
本文中使用expo创建app，这也是一个趋势。

```bash
expo init ballcap
```
![](screenshot/expo_init1.png)

选择第一项blank

![](screenshot/expo_init2.png)

完成
![](screenshot/expo_init3.png)

新创建的工程目录如下：
```txt
.
├── .expo
├── .expo-shared
├── .git
├── .gitignore
├── App.js
├── app.json
├── assets
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash.png
├── babel.config.js
├── node_modules
├── package.json
├── project.txt
└── yarn.lock
```
比传统的RN工程要简单很多。

# 运行

执行下面的命令：

```bash
yarn android
```
你将会看到一个硕大的二维码：

![](screenshot/expo_android.png)

手机上用expo扫描二维码即可在手机上运行app，如图：

![](screenshot/init_app_270x600.png)

到此为止我们的准备工作已经就绪可以愉快的玩耍了。

# 开发：

## 引入游戏引擎：RNGM

### 安装npm: react-native-game-engine
```bash
yarn add react-native-game-engine
```

### 修改App.js
修改前：
```js
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

修改后：
```js
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// 添加游戏引擎1/2
import { GameEngine } from "react-native-game-engine";

export default function App() {
  // 添加游戏引擎2/2
  return (
    <GameEngine style={styles.container}>
      <StatusBar hidden={true} />
    </GameEngine>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

```

此时reload你的app，你会发现整个世界清净了：

“此处省略全白截图一张”

## 接下来添加物体

### 添加Ball

新建Ball.js:
```js
import React, { Component } from "react";
import { View } from "react-native";
import { array, object, string } from 'prop-types';

export default class Ball extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    const minSize = Math.min(width, height);
    return (
      <View
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
          backgroundColor: this.props.color || "orange",
          borderWidth: 2,
          borderRadius: minSize / 2,
          borderColor: 'black'
        }} />
    );
  }
}

Ball.propTypes = {
  size: array,
  body: object,
  color: string
}
```
和其他的RN组件没有什么区别，就是简单的将正方形的View加上圆角变成圆。

接下来，修改App.js引入Ball，并添加ball对象：
```js
// ...
import {
  Dimensions,
  // ...
} from 'react-native';
// ...
// 添加Ball 1/2
import Ball from './Ball';
const { width, height } = Dimensions.get("screen");
const ballSize = Math.trunc(Math.max(width, height) * 0.075);
const ball = { position: { x: width / 2, y: height / 2 } };


export default function App() {
  // 添加游戏引擎2/2
  return (
    <GameEngine
      style={styles.container}
      entities={{
        // 添加Ball 2/2
        ball: {
          body: ball,
          size: [ballSize, ballSize],
          color: '#f93',
          renderer: Ball
        }
      }} >
      <StatusBar hidden={true} />
    </ GameEngine>
  );
}
// ...
```

reload效果如图：

![](screenshot/add_ball_270x600.png)


### 添加Wall

创建Wall.j添加代码

其实和Ball类似的一个组件：

“此处省略Wall源码29行”

在App.js中 添加Wall

```js
//...
// 添加Walls 1/3
import Wall from './Wall';

const ball = createObject(width / 2, height / 2);

//...
// 添加Walls 2/3
const wallColor = "#335"
const wallSize = ballSize / 4;
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
          //....
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
//...

```

效果如图：

![](screenshot/add_wall_270x600.png)


## 接下来添加物理引擎Matter

# 参考资料：
[expo accelerometer](https://docs.expo.io/versions/v40.0.0/sdk/accelerometer/)


[My Journey with React Native Game Engine Part I: Starting the Project](https://medium.com/@williamyang93/my-journey-with-react-native-game-engine-part-i-starting-the-project-bbebcd2ccf6)

[My Journey with React Native Game Engine Part II: Adding Touch and Bounce](https://medium.com/@williamyang93/my-journey-with-react-native-game-engine-part-ii-adding-touch-and-bounce-b9ae3fac06b9)

# 源码地址
