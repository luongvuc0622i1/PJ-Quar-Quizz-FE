import {Level} from "./level";
import {Categories} from "./categories";
import {TypeQuizzes} from "./typequizzes";


export interface Quiz {
    id?: number,
    answer?:string;
    correct_answer?:string;
    name?:string;
    typeQuizzes?:TypeQuizzes;
    level?: Level;
    categories?: Categories[]
}
