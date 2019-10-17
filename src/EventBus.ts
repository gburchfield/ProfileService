import redis from 'redis'

const EventBus = redis.createClient('redis://redis:6379')

EventBus.on('subscribe', (channel, count) => {
    console.log(`Listening to the ${channel} channel`)
})

export default EventBus
