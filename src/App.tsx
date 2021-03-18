import { Redirect, Route } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { school, book, albums, people } from "ionicons/icons";
// Academic Years tab
import AcademicYears from "./pages/AcademicYears";
import AcademicYearSemesters from "./pages/AcademicYearSemesters";
import AcademicYearSemesterCourses from "./pages/AcademicYearSemesterCourses";
import CourseDetails from "./pages/CourseDetails";
// Courses tab
import Courses from "./pages/Courses";
// Diploma Programs tab
import DiplomaPrograms from "./pages/DiplomaPrograms";
import AcademicAdvisors from "./pages/AcademicAdvisors";
import AdvisingAssignments from "./pages/AdvisingAssignments";
// Instructors tab
import Instructors from "./pages/Instructors";
import InstructorCourses from "./pages/InstructorCourses";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/academicyears">
            <AcademicYears />
          </Route>
          <Route path="/academicyears/:id" component={AcademicYearSemesters} />
          <Route path="/semester_courses/:id" component={AcademicYearSemesterCourses} />
          <Route path="/course/:id" component={CourseDetails} />
          <Route exact path="/courses">
            <Courses />
          </Route>
          <Route path="/course/:id" component={CourseDetails} />
          <Route path="/diplomaprograms">
            <DiplomaPrograms />
          </Route>
          <Route path="/diplomaprogram/:id" component={AcademicAdvisors} />
          <Route path="/instructor_advising/:id" component={AdvisingAssignments} />
          <Route path="/instructors">
            <Instructors />
          </Route>
          <Route path="/instructor_courses/:id" component={InstructorCourses} />
          <Route exact path="/">
            <Redirect to="/academicyears" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="academicyears" href="/academicyears">
            <IonIcon icon={school} />
            <IonLabel>Academic Years</IonLabel>
          </IonTabButton>
          <IonTabButton tab="courses" href="/courses">
            <IonIcon icon={book} />
            <IonLabel>Courses</IonLabel>
          </IonTabButton>
          <IonTabButton tab="diplomaprograms" href="/diplomaprograms">
            <IonIcon icon={albums} />
            <IonLabel>Diploma Programs</IonLabel>
          </IonTabButton>
          <IonTabButton tab="instructors" href="/instructors">
            <IonIcon icon={people} />
            <IonLabel>Instructors</IonLabel>
          </IonTabButton>{" "}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
