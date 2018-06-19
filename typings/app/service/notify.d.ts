interface AlarmInfo {
    compariseId: string
    quondamId: string //原图id
    similarity: number //相似度
    snapTime: number //抓拍时间
    snapAddress: string //抓拍地点
    compariseUrl: string //比重图url
    name: string //姓名
    sex: number //性别 -1-不限，0-未知，1-男，2-女
    credentialsType: number //证件类型 0-无，1-身份证，2-警官证
    credentialsNum: number //证件号码
    describeContent: string //比中描述
}

interface RecordData {
    imgId: string
    robotCode: String
    imgUrl: String
    timestamp: number
}
