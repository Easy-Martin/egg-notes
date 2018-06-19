import { Service } from 'egg'
import * as uuid from 'uuid'
const LibsName = ['在逃人员库', '吸毒人员库', '在逃人员库', '常住人口库']
const Names = ['黄京京', '田进', '赵冰', '蔡毅', '周洋']
type Alarm = {
    quondam: RecordData
    comparison: AlarmInfo
}


let alarmList: Array<Alarm> = []
let recordList: Array<RecordData> = []

class NotifyService extends Service {
    
    public async historyAlarm(): Promise<Array<Alarm>> {
        const data = await this.ctx.dao.notify.saveAlarm();
        console.log(data)
        return alarmList
    }

    public async historyRecord(): Promise<Array<RecordData>> {
        return recordList
    }

    public async alarmData(): Promise<Alarm | null> {
        let alarm = {} as Alarm
        let record =
            recordList[Math.round(Math.random() * recordList.length)]
        if (!record) {
            return null
        }
        alarm.quondam = record

        alarm.comparison = {
            compariseId: uuid.v1(),
            quondamId: uuid.v1(), //原图id
            similarity: Math.round(Math.random() * 20) + 80, //相似度
            snapTime: new Date(
                `2018-6-${Math.round(Math.random() * 8) + 1}`
            ).valueOf(), //抓拍时间
            snapAddress: `上海市南京西路`, //抓拍地点
            compariseUrl: `http://${this.ctx.helper.getIPAdress()}/public/images/${Math.round(
                Math.random() * 4
            ) + 1}.jpg`, //比重图url
            name: Names[Math.round(Math.random() * Names.length)], //姓名
            sex: Math.round(Math.random()), //性别 -1-不限，0-未知，1-男，2-女
            credentialsType: 1, //证件类型 0-无，1-身份证，2-警官证
            credentialsNum: 420821198856784450, //证件号码
            describeContent:
                LibsName[Math.round(Math.random() * LibsName.length)] //比中描述
        }
        alarmList.push(alarm)
        return alarm
    }

    public async recordData(): Promise<RecordData> {
        let record = {} as RecordData
        record = {
            imgId: uuid.v1(),
            robotCode: uuid.v1(),
            imgUrl: `http://${this.ctx.helper.getIPAdress()}/public/images/${Math.round(
                Math.random() * 4
            ) + 1}.jpg`,
            timestamp: new Date(
                `2018-6-${Math.round(Math.random() * 8) + 1}`
            ).valueOf()
        }
        recordList.push(record)
        return record
    }
}

export default NotifyService
