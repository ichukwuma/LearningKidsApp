//touches for detect touch input, 
//time for predict and update app according to time of previous position, 
//dispatch = allows to send messages from files to game engine, update info such as game lost or updating points/score

const Physics = (entities, {touches, time, dispatch}) => {
    let engine = entities.physics.engine
    Matter.Engine.update(engine, time.delta) //diff between previous and current time variable

    //return entities updated with the lastest information
    return entities;
}

export default Physics