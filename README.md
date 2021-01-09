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

## 引入引擎

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
// 添加游戏引擎1/3
import { GameEngine } from "react-native-game-engine";

export default function App() {
  // 添加游戏引擎1/3
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

接下来添加物体



# 参考资料：
[expo accelerometer](https://docs.expo.io/versions/v40.0.0/sdk/accelerometer/)


[My Journey with React Native Game Engine Part I: Starting the Project](https://medium.com/@williamyang93/my-journey-with-react-native-game-engine-part-i-starting-the-project-bbebcd2ccf6)

[My Journey with React Native Game Engine Part II: Adding Touch and Bounce](https://medium.com/@williamyang93/my-journey-with-react-native-game-engine-part-ii-adding-touch-and-bounce-b9ae3fac06b9)