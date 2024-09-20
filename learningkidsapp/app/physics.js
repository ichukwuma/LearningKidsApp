import Matter from 'matter-js'

const Physics = (entities, { touches }) => {
    let engine = entities.physics.engine
    Matter.Engine.update(engine, 16)

    // Handle touch events
    touches.filter(t => t.type === 'move').forEach(t => {
        if (entities.Bird && entities.Bird.body) {
            Matter.Body.setPosition(entities.Bird.body, { 
                x: t.event.pageX,
                y: entities.Bird.body.position.y
            })
        }
    })

    return entities;
}

export default Physics