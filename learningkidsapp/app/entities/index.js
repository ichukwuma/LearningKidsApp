import Matter from 'matter-js'
import Corgi from "../components/Corgi";
import Treat from "../components/Treat";
import { View, Image, PanResponder, Dimensions } from 'react-native';

let treatId = 0;

// Get screen dimensions
const { width, height } = Dimensions.get('window');

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

    // return {
    //     physics: { engine, world },
    //     Corgi: Corgi(world, 'green', { x: 200, y: 740 }, { height: 80, width: 80 }),
    //     createTreat,
    // }
    // Calculate corgi size based on screen dimensions
    const corgiWidth = width * 0.18; // 18% of screen width
    const corgiHeight = height * 0.10; // 20% of screen height


    // Set the vertical position to 80% of the screen height
    const corgiYPos = height * 0.75; // Adjust this value as needed

    return {
        physics: { engine, world },
        Corgi: Corgi(world, 'green', { x: 200, y: corgiYPos }, { height: corgiHeight, width: corgiWidth }),
        createTreat,
    }
}