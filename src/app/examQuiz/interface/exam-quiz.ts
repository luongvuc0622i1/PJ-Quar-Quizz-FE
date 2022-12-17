import {Test} from "../../model/test";
import {Quiz} from "../../quiz/model/quiz";
import {User} from "../../model/user";


export interface ExamQuiz {
    id:number;
    quiz:Quiz;
    test:Test;
    answerUser:string;
    status : number;
    appUser: User;
}
