import * as Kafka from 'kafka-node'
import { KafkaConfig } from '../config/config.d'
import load from './kafkaLoad'
import { Offset, OffsetFetchRequest } from 'kafka-node'
import { Application } from 'egg'

export default async (app: Application) => {
    load(app)

    const config: KafkaConfig = app.config.kafka

    const zookeepers = config.host.join(',')

    const client = new Kafka.Client(zookeepers, config.clientId)

    const offset = new Kafka.Offset(client)

    const topics = await fixOffsetToLast(offset, config.topics)

    const consumer = new Kafka.Consumer(client, topics, config.options)

    app.logger.info(
        `[egg-kafka] method -> fetchLatestOffsets`,
        JSON.stringify(topics)
    )

    consumer.on('message', (message: any) => {
        const topicConsumers = app.kafka[message.topic]
        if (topicConsumers) {
            Object.keys(topicConsumers).map((name: string) => {
                topicConsumers[name].call(app, message.value)
            })
        }
        app.logger.info(
            `[egg-kafka] Receive producer message`,
            JSON.stringify(message)
        )
    })

    consumer.on('offsetOutOfRange', topic => {
        app.logger.info(`[egg-kafka] event -> offsetOutOfRange`, topic)
        topic.maxNum = 2
        offset.fetch([topic], (error, offsets) => {
            if (error) {
                return app.coreLogger.error('[egg-kafka]', error)
            }
            const min = Math.min.apply(
                null,
                offsets[topic.topic][topic.partition]
            )

            consumer.setOffset(topic.topic, topic.partition, min)

            app.logger.info(
                `[egg-kafka] method -> setOffset`,
                topic.topic,
                topic.partition,
                min
            )
        })
    })

    consumer.on('error', (error: Error) => {
        app.coreLogger.error(`[egg-kafka] init instance error`, error)
    })

    app.beforeStart(() => {
        app.coreLogger.info(
            `[egg-kafka] init instance success ,host@${zookeepers} -----> topic@${topics}`
        )
    })
}

function fixOffsetToLast(
    offset: Offset,
    topics: OffsetFetchRequest[]
): Promise<OffsetFetchRequest[]> {
    return new Promise((resolve, reject) => {
        offset.fetchLatestOffsets(
            topics.map(item => item.topic),
            (error, offsets: { [key: string]: any }) => {
                if (error) {
                    reject(error)
                } else {
                    topics.map((item: any) => {
                        item.offset = offsets[item.topic][item.partition]
                    })
                    resolve(topics)
                }
            }
        )
    })
}
