import Matter from 'matter-js'
import React from 'react'
import { Pressable, Text, View, StyleSheet, Image} from 'react-native';
import {  useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const Bird = props => {
    //gets max val of x
    const widthBody = (props.body.bounds.max.x - props.body.bounds.min.x) * 3
    const heightBody = (props.body.bounds.max.y - props.body.bounds.min.y) * 3

    const xBody = props.body.position.x - widthBody /2
    const yBody = props.body.position.y - heightBody /2

    const color = props.color;

    return(
        // <View style = {styles.dog}>
        //     <Image source={require('../../assets/scale5doggo.png')} style={styles.doggoImage} />
        // </View>
        // <View
        //     style={[
        //         styles.dog,
        //         {
        //             left: xBody,
        //             top: yBody,
        //             width: widthBody,
        //             height: heightBody,
        //         },
        //     ]}
        // >
        //     {/* <Image
        //         source={require('../../assets/scale5doggo.png')}
        //         style={styles.doggoImage}
        //     /> */}
        //     <Image
        //         source={require('../../assets/scale5doggo.png')}
        //         style={{ width: widthBody, height: heightBody }} // Make image fill the rectangle
        //         resizeMode="cover" // Use 'cover' to maintain aspect ratio, or 'stretch' to stretch
        //     />
        // </View>

        <View
            style={[
                styles.dog,
                {
                    left: xBody,
                    top: yBody,
                    width: widthBody,
                    height: heightBody,
                },
            ]}
        >
            {/* Dynamically adjust the size of the image to fit the rectangle */}
            <Image
                source={require('../../assets/scale5doggo.png')}
                style={{ width: widthBody, height: heightBody }}
                resizeMode="stretch" // Adjust the image to fill the rectangle
            />
        </View>


        //THIS WORKS
        // <Image
        //     source={require('../../assets/scale5doggo.png')}
        //     style={{
        //         position: 'absolute',   // Ensure the image is positioned absolutely
        //         left: xBody,            // Use the rectangle's calculated position
        //         top: yBody,             // Use the rectangle's calculated position
        //         width: widthBody,       // Set the width to match the rectangle
        //         height: heightBody,     // Set the height to match the rectangle
        //     }}
        //     resizeMode="cover" // Use 'cover' or 'stretch' based on how you want the image to scale
        // />
    )
}


{/*'rfc' creates react functional components */}
export default (world, color, pos, size) =>  {
      //you can changerect to circle or something to make it more bird or dog like
    //the hitbox of the bird component
    const initialBird = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {label: 'Bird'}
    )
    Matter.World.add(world, initialBird)

    return {
        body: initialBird,
        color,
        pos,
        renderer: <Bird/>
    }
}


const styles = StyleSheet.create({

    dog: {

        borderWidth: 1,
        //borderColor: color,
        borderStyle: 'solid',
        position: 'absolute',
        // left: xBody,
        // top: yBody,
        // width: widthBody,
        // height: heightBody,
    },
    doggoImage: {
        width: 200, 
        height: 200,
    },


});