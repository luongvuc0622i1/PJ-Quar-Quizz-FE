import {User} from "./user";
import {ExamQuiz} from "./exam-quiz";

export interface ExamTest {
    id?: number,
    examQuizzes?: ExamQuiz[],
    user?: User,
}
