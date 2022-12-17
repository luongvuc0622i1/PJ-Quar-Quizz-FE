import {Level} from "./level";

export interface Test {
    id?: number,
    name?: string,
    level?: Level,
    quizzes?: any,
    categories?: any,
    passScore?: number,
    maxTime?: string
}
