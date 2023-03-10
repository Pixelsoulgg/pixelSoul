import { IResponse } from "../interfaces/game"

export const returnInfor = (code: number, data: any, message: string) => {
    const rt: IResponse = {
        code,
        data,
        message
    }
    return rt;
}