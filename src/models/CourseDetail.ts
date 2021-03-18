import Course from "./Course";

interface CourseDetail {
  Id: number;
  CourseCode: string;
  Title: string;
  prerequisiteCourses: Course[];
  prerequisitesFor: Course[];
}

export default CourseDetail;
