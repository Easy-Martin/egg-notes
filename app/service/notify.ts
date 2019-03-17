import { Service } from 'egg'
import * as uuid from 'uuid'

interface Alarm {
  quondam: RecordData
  comparison: AlarmInfo
}

const LibsName = ['在逃人员库', '吸毒人员库', '在逃人员库', '常住人口库']
const Names = ['黄京京', '田进', '赵冰', '蔡毅', '周洋']

const alarmList: Alarm[] = []
const recordList: RecordData[] = []

class NotifyService extends Service {
  public async historyAlarm(): Promise<Alarm[]> {
    return alarmList
  }

  public async historyRecord(): Promise<RecordData[]> {
    return recordList
  }

  public async alarmData(): Promise<Alarm | null> {
    const alarm = {} as Alarm
    const record = recordList[Math.round(Math.random() * recordList.length)]
    if (!record) {
      return null
    }
    alarm.quondam = record

    alarm.comparison = {
      compariseId: uuid.v1(),
      quondamId: uuid.v1(), // 原图id
      similarity: Math.round(Math.random() * 20) + 80, // 相似度
      snapTime: new Date(
        `2018-6-${Math.round(Math.random() * 8) + 1}`
      ).valueOf(), // 抓拍时间
      snapAddress: `上海市南京西路`, //抓拍地点
      compariseUrl: `http://${this.ctx.helper.getIPAdress()}/public/images/${Math.round(
        Math.random() * 4
      ) + 1}.jpg`, //比重图url
      name: Names[Math.round(Math.random() * Names.length)], // 姓名
      sex: Math.round(Math.random()), // 性别 -1-不限，0-未知，1-男，2-女
      credentialsType: 1, // 证件类型 0-无，1-身份证，2-警官证
      credentialsNum: 420821198856784450, //证件号码
      describeContent: LibsName[Math.round(Math.random() * LibsName.length)] // 比中描述
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

  public async communityPeople(): Promise<Object> {
    return {
      data: {
        id: 'A3632C0B376A4E749A06AFCE59F5E0D5',
        alarmLogId: '8262443E14C846E8B680AB5448AF6F62',
        infoId: null,
        structuredInfoJson: null,
        objectMainJson: {name:'张山',address:'莱卡小镇8L86R050023'},
        cameraName: '莱卡小镇8L86R050023',
        libId: '101000000458',
        libName: '川槎村_108100000001',
        taskId: 'D82BC104FDD542529C652351F29281DC',
        taskName: '川槎村_108100000001',
        scenePath:
          'http://img2.imgtn.bdimg.com/it/u=2138091517,1647494391&fm=214&gp=0.jpg',
        faceRect: '974,310,75,67',
        similarity: 99,
        captureTime: '1532059140000',
        alarmTime: '1532751812747',
        oid: [100101001553],
        cid: [100100000289],
        isEffective: 0,
        isHandle: 0,
        geoAddress: null,
        facePath:
          'http://img2.imgtn.bdimg.com/it/u=2138091517,1647494391&fm=214&gp=0.jpg',
        operationDetail: null,
        imageUrl: 'http://img2.imgtn.bdimg.com/it/u=2138091517,1647494391&fm=214&gp=0.jpg',
        cameraId: 538448021,
        alarmNotifyUsers: [108100000001]
      },
      villageId: 108100000001
    }
  }

  public async unknownPeople(): Promise<Object> {
    return {
      data: {
        id: 'A3632C0B376A4E749A06AFCE59F5E0D5',
        alarmLogId: '8262443E14C846E8B680AB5448AF6F62',
        infoId: null,
        structuredInfoJson: null,
        objectMainJson: null,
        cameraName: '莱卡小镇8L86R050023',
        libId: '101000000458',
        libName: '川槎村_108100000001',
        taskId: 'D82BC104FDD542529C652351F29281DC',
        taskName: '川槎村_108100000001',
        scenePath:
          'http://img2.imgtn.bdimg.com/it/u=2138091517,1647494391&fm=214&gp=0.jpg',
        faceRect: '974,310,75,67',
        similarity: null,
        captureTime: '1532059140000',
        alarmTime: '1532751812747',
        oid: [100101001553],
        cid: [100100000289],
        isEffective: 0,
        isHandle: 0,
        geoAddress: null,
        facePath:
          'http://img2.imgtn.bdimg.com/it/u=2138091517,1647494391&fm=214&gp=0.jpg',
        operationDetail: null,
        imageUrl: null,
        cameraId: 538448021,
        alarmNotifyUsers: [108100000001]
      },
      villageId: 108100000001
    }
  }
}

export default NotifyService
