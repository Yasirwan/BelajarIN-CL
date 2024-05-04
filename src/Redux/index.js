import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import adminReducer from "./admin/reducer";
import tutorReducer from "./tutor/reducer";
import studentReducer from "./student/reducer";
import scratchReducer from "./scratch/reducer";
import lessonReducer from "./lesson/reducer";
import contentReducer from "./content/reducer";
import assignmentReducer from "./assignment/reducer";
import testReducer from "./test/reducer";
import doubtReducer from "./doubt/reducer";
import dashboardReducer from "./dashboard/reducer";
import testResultReducer from "./testresult/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  tutor: tutorReducer,
  student: studentReducer,
  scratch: scratchReducer,
  lesson: lessonReducer,
  content: contentReducer,
  assignment: assignmentReducer,
  test: testReducer,
  doubt: doubtReducer,
  dashboard: dashboardReducer,
  testResult: testResultReducer,
});
