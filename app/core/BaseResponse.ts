class BaseResponse {
    constructor(public code: number, public message: string) {}
}

export class ResponseSuccess extends BaseResponse {
    type: string
    constructor({ code, message }, public result?: any) {
        super(code, message)
        this.type = 'success'
    }
}

export class ResponseError extends BaseResponse {
    type: string
    constructor({ code, message }, public result?: any) {
        super(code, message)
        this.type = 'error'
    }
}
