import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import adminReducer from "./admin/reducer";
import tutorReducer from "./tutor/reducer";
import studentReducer from "./student/reducer";
import scratchReducer from "./scratch/reducer";
import scratch2Reducer from "./scratch/reducer2";
import scratch3Reducer from "./scratch/reducer3";
import lessonReducer from "./lesson/reducer";
import lessonxReducer from "./lesson/reducerx";
import contentReducer from "./content/reducer";
import assignmentReducer from "./assignment/reducer";
import testReducer from "./test/reducer";
import doubtReducer from "./doubt/reducer";
import doubt2Reducer from "./doubt/reducer2";
import doubt3Reducer from "./doubt/reducer3";
import dashboardReducer from "./dashboard/reducer";
import testResultReducer from "./testresult/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  tutor: tutorReducer,
  student: studentReducer,
  scratch: scratchReducer,
  scratch2: scratch2Reducer,
  scratch3: scratch3Reducer,
  lesson: lessonReducer,
  lessonx: lessonxReducer,
  content: contentReducer,
  assignment: assignmentReducer,
  test: testReducer,
  doubt: doubtReducer,
  doubt2: doubt2Reducer,
  doubt3: doubt3Reducer,
  dashboard: dashboardReducer,
  testResult: testResultReducer,
});
