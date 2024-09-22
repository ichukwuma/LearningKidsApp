// import Matter from 'matter-js'
// import Bird from "../components/Bird";

// {/*This is for tutorial purposes for treat falls*/}
// {/*Will change later on if need be*/}

// export default restart => {
//     let engine = Matter.Engine.create({enableSleeping: false})

//     let world = engine.world

//     //this is the gravity of our game world idk but i think y = y axis 
//     //world.gravity.x = 0.4; 
//     engine.world.gravity = { x: 0, y: 0.4 };
//     return{
//         physics: {engine, world},
//         Bird: Bird(world, 'green', {x: 200, y:740}, {height: 150, width: 150})

//     }
// }



//idk second one 


// import Matter from 'matter-js'
// import Bird from "../components/Bird";
// import Treat from "../components/Treat";

// let treatId = 0;

// export default restart => {
//     let engine = Matter.Engine.create({enableSleeping: false})
//     let world = engine.world

//     engine.world.gravity = { x: 0, y: 0.4 };

//     return {
//         physics: {engine, world},
//         Bird: Bird(world, 'green', {x: 200, y:740}, {height: 150, width: 150}),
//         treats: {},

//         createTreat: (world) => {
//             const treatType = Math.random() > 0.3 ? 'good' : 'bad';
//             const xPos = Math.random() * (400 - 50) + 25;
//             const treat = Treat(world, treatType, {x: xPos, y: -50}, {height: 50, width: 50});
//             return { id: treatId++, ...treat };
//         }
//     }
// }




//third one 

// import Matter from 'matter-js'
// import Bird from "../components/Bird";
// import Treat from "../components/Treat";

// let treatId = 0;

// export default restart => {
//     let engine = Matter.Engine.create({ enableSleeping: false })
//     let world = engine.world
//     engine.world.gravity = { x: 0, y: 0.4 };

//     return {
//         physics: { engine, world },
//         Bird: Bird(world, 'green', { x: 200, y: 740 }, { height: 150, width: 150 }),
//         treats: {},

//         createTreat: (world) => {
//             const treatType = Math.random() > 0.3 ? 'good' : 'bad';
//             const xPos = Math.random() * (400 - 50) + 25;
//             const treat = Matter.Bodies.rectangle(
//                 xPos,
//                 -50,
//                 50,
//                 50,
//                 {
//                     label: 'Treat',
//                     isSensor: true,
//                     isStatic: false,
//                     restitution: 0,
//                 }
//             );
//             Matter.World.add(world, treat);
//             return {
//                 body: treat,
//                 treatType,
//                 renderer: <Treat />
//             };
//         }
//     }
// }

//fourth

import Matter from 'matter-js'
import Bird from "../components/Bird";
import Treat from "../components/Treat";

let treatId = 0;

export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false })
    let world = engine.world
    engine.world.gravity = { x: 0, y: 0.4 };

    const createTreat = () => {
        const treatType = Math.random() > 0.3 ? 'good' : 'bad';
        const xPos = Math.random() * (400 - 50) + 25;
        const treat = Matter.Bodies.rectangle(
            xPos,
            -50,
            50,
            50,
            {
                label: 'Treat',
                isSensor: true,
                isStatic: false,
                restitution: 0,
            }
        );
        Matter.World.add(world, treat);
        return {
            body: treat,
            treatType,
            renderer: <Treat />
        };
    };

    return {
        physics: { engine, world },
        Bird: Bird(world, 'green', { x: 200, y: 740 }, { height: 150, width: 150 }),
        createTreat,
    }
}