import { IonList, IonItem } from "@ionic/react";
import "./AcademicAdvisorsList.css";
import AcademicAdvisor from "../models/AcademicAdvisor";

interface AcademicAdvisorsListProps {
  academicAdvisors: AcademicAdvisor[];
}

const AcademicAdvisorsList: React.FC<AcademicAdvisorsListProps> = ({ academicAdvisors }) => {
  return (
    <IonList>
      {academicAdvisors.length === 0 ? (
        <IonItem>None</IonItem>
      ) : (
        academicAdvisors.map((academicAdvisor, index) => {
          return (
            <IonItem button detail routerLink={`/instructor_advising/${academicAdvisor.Id}`} key={index}>
              {`${academicAdvisor.AcademicYear} - ${academicAdvisor.DiplomaProgramYear} - ${academicAdvisor.DiplomaProgramSection} - ${academicAdvisor.InstructorName}`}
            </IonItem>
          );
        })
      )}
    </IonList>
  );
};

export default AcademicAdvisorsList;
