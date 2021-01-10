import Matter from "matter-js";

// 创建引擎
const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;
// 引擎对象
export const physicsEntity = {
  engine: engine,
  world: world
};

// 更新引擎
export const Physics = (entities, { time }) => {
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

// 点击创建球
let ballIndex = 0;
const ballColors = [ "#f93", "#f39", "#9f3", "#3f9", "#93f", "#39f"];
export const CreateBalls = (renderer)=> (entities, { touches, screen }) => {
  const ballSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);
  
  touches.filter(t => t.type === "press").forEach(t => {
    entities[++ballIndex] = {
      body: createBall(t.event.pageX, t.event.pageY, ballSize / 2),
      size: [ballSize, ballSize],
      color: ballColors[ballIndex % ballColors.length],
      renderer: renderer
    };
  });
  return entities;
};

//创建墙
export const createWall = (x, y, w, h) => {
  const wall = Matter.Bodies.rectangle(x, y, w, h, { isStatic: true })
  Matter.World.add(world, wall);
  return wall;
};

//创建球
export const createBall = (x, y, r) => {
  const ball = Matter.Bodies.circle(x, y, r, { frictionAir: 0.021 });
  Matter.World.add(world, [ball]);
  return ball;

}