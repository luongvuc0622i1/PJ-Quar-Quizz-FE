import {Level} from "./level";
import {TypeQuizzes} from "./typequizzes";
import {Category} from "./category";

export interface Quiz {
    id?: number,
    answer?: string,
    correct_answer?: string,
    name?: string,
    typeQuizzes?: TypeQuizzes,
    level?: Level,
    categories?: Category[],
}
