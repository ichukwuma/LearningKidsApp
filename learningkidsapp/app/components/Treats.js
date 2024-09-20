import Matter from 'matter-js'
import React from 'react'
import { View, Image } from 'react-native';

const Treats = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    return (
        <View
            style={{
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody,
            }}
        >
            <Image
                source={require('../../assets/treats.png')}
                style={{ width: widthBody, height: heightBody }}
                resizeMode="contain"
            />
        </View>
    )
}

export default (world, label, color, pos, size) => {
    const initialTreat = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label,
            frictionAir: 0.02,
            restitution: 0.8 
        }
    )
    Matter.World.add(world, initialTreat)

    return {
        body: initialTreat,
        color,
        pos,
        renderer: <Treats/>  // Changed from <Treat/> to <Treats/>
    }
}