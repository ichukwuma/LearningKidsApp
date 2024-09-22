// import Matter from 'matter-js'
// import React from 'react'
// import { View, Image } from 'react-native'

// const Treat = (props) => {
//     const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
//     const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

//     const xBody = props.body.position.x - widthBody / 2
//     const yBody = props.body.position.y - heightBody / 2

//     return (
//         <View
//             style={{
//                 position: 'absolute',
//                 left: xBody,
//                 top: yBody,
//                 width: widthBody,
//                 height: heightBody,
//             }}
//         >
//             <Image
//                 source={props.treatType === 'good' ? require('../../assets/good_treat.png') : require('../../assets/bad_treat.png')}
//                 style={{ width: widthBody, height: heightBody }}
//                 resizeMode="contain"
//             />
//         </View>
//     )
// }

// export default (world, treatType, pos, size) => {
//     const initialTreat = Matter.Bodies.rectangle(
//         pos.x,
//         pos.y,
//         size.width,
//         size.height,
//         { 
//             label: 'Treat',
//             isSensor: true,
//             isStatic: false,
//             restitution: 0,
//             treatType: treatType
//         }
//     )
//     Matter.World.add(world, initialTreat)

//     return {
//         body: initialTreat,
//         treatType,
//         pos,
//         renderer: <Treat/>
//     }
// }

//2nd

// import React from 'react'
// import { View, Image } from 'react-native'

// const Treat = (props) => {

//     if (!props.body) {
//         console.warn('Treat component received undefined body prop');
//         return null; // Return null if body is undefined to prevent rendering
//     }


//     const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
//     const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

//     const xBody = props.body.position.x - widthBody / 2
//     const yBody = props.body.position.y - heightBody / 2

//     return (
//         <View
//             style={{
//                 position: 'absolute',
//                 left: xBody,
//                 top: yBody,
//                 width: widthBody,
//                 height: heightBody,
//             }}
//         >
//             <Image
//                 source={props.treatType === 'good' ? require('../../assets/good_treat.png') : require('../../assets/bad_treat.png')}
//                 style={{
//                     width: widthBody,
//                     height: heightBody,
//                     resizeMode: 'contain'
//                 }}
//             />
//         </View>
//     )
// }

// export default Treat;


//3rd

import React from 'react'
import { View, Image } from 'react-native'

const Treat = ({ body, treatType }) => {
    if (!body) {
        console.warn('Treat component received undefined body prop');
        return null;
    }

    const width = body.bounds.max.x - body.bounds.min.x;
    const height = body.bounds.max.y - body.bounds.min.y;
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;

    return (
        <View
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: width,
                height: height,
            }}
        >
            <Image
                source={treatType === 'good' ? require('../../assets/good_treat.png') : require('../../assets/bad_treat.png')}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain'
                }}
            />
        </View>
    )
}

export default Treat;
