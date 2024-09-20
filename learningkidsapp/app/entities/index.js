import Matter from 'matter-js'
import Bird from "../components/Bird";

{/*This is for tutorial purposes for treat falls*/}
{/*Will change later on if need be*/}

export default restart => {
    let engine = Matter.Engine.create({enableSleeping: false})

    let world = engine.world

    //this is the gravity of our game world idk but i think y = y axis 
    //world.gravity.x = 0.4; 
    engine.world.gravity = { x: 0, y: 0.4 };
    return{
        physics: {engine, world},
        Bird: Bird(world, 'green', {x: 200, y:740}, {height: 150, width: 150})

    }
}