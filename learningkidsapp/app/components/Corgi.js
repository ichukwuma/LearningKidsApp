import Matter from 'matter-js'
import React from 'react'
import { View, Image, PanResponder, Dimensions } from 'react-native';


// Get screen dimensions
const { width, height } = Dimensions.get('window');


const Corgi = (props) => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
            Matter.Body.setPosition(props.body, {
                x: gesture.moveX,
                y: props.body.position.y
            });
        }
    });

    return (
        <View
            style={{
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody,
            }}
            {...panResponder.panHandlers}
        >
            <Image
                source={require('../../assets/scale5doggoSmall.png')}
                style={{ width: widthBody, height: heightBody }}
                resizeMode="contain"
            />
        </View>
    )
}

export default (world, color, pos, size) => {
    const initialCorgi = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        { label: 'Corgi', isStatic: true }
    );
    Matter.World.add(world, initialCorgi)

    return {
        body: initialCorgi,
        color,
        pos,
        renderer: <Corgi/>
    };
}