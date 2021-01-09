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


//创建墙
export const createWall = (x, y, w, h) => {
  const wall = Matter.Bodies.rectangle(x, y, w, h, { isStatic: true })
  Matter.World.add(world, wall);
  return wall;
};

//创建球
export const createBall = (x, y, r) => {
  const ball = Matter.Bodies.circle(x, y, r, { frictionAir: 0.021 });
  Matter.World.add(world, ball);
  return ball;

}