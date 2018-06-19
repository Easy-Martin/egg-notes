import * as Kafka from 'kafka-node'
import { KafkaConfig } from '../config/config.d'
import load from './kafkaLoad'

export default app => {
    load(app)
    const config: KafkaConfig = app.config.kafka
    const zookeepers = config.host.join(',')
    const client = new Kafka.Client(zookeepers,config.clientId)
    const consumer = new Kafka.Consumer(client, config.topics, config.options)
    const topics = config.topics.map(item => item.topic)

    consumer.on('message', message => {
        const topicConsumers = app.kafka[message.topic]
        if (topicConsumers) {
            Object.keys(topicConsumers).map(name =>
                topicConsumers[name].call(app, message.value)
            )
        }
        app.logger.info(
            `[egg-kafka] Receive producer message`,
            JSON.stringify(message)
        )
    })

    consumer.on('error', error => {
        app.coreLogger.error(`[egg-kafka] init instance error`, error)
    })

    app.beforeStart(() => {
        app.coreLogger.info(
            `[egg-kafka] init instance success ,host@${zookeepers} -----> topic@${topics}`
        )
    })
}
