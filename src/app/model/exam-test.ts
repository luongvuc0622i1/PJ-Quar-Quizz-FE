import {User} from "./user";
import {ExamQuiz} from "./exam-quiz";

export interface ExamTest {
    id?: number,
    numOfTA?: number,
    examQuizzes?: ExamQuiz[],
    user?: User,
}
