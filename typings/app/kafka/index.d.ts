import { TopicNodejs } from '../../../app/kafka/nodejs'

type Kafka = {
    nodejs: TopicNodejs
}

declare module 'egg' {
    interface Application {
        kafka: Kafka
    }
}
