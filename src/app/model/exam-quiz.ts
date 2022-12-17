import {Test} from "./test";
import {User} from "./user";
import {Quiz} from "./quiz";

export interface ExamQuiz {
    id?: number,
    quiz?: Quiz,
    test?: Test,
    answerUser?: String,
    user?: User,
}
