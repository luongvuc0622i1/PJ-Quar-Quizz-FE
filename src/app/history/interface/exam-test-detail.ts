import {User} from "../../model/user";
import {ExamQuiz} from "../../examQuiz/interface/exam-quiz";

export interface ExamTestDetail {
    id:number;
    numOfTA:number;
    examQuizzes:ExamQuiz ;
    appUser: User;
}
