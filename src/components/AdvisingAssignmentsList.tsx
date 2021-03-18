import { IonList, IonItem } from "@ionic/react";
import "./AdvisingAssignmentsList.css";
import AdvisingAssignment from "../models/AdvisingAssignment";

interface AdvisingAssignmentsListProps {
  advisingAssignments: AdvisingAssignment[];
}

const AdvisingAssignmentsList: React.FC<AdvisingAssignmentsListProps> = ({ advisingAssignments }) => {
  return (
    <IonList>
      {advisingAssignments.length === 0 ? (
        <IonItem>None</IonItem>
      ) : (
        advisingAssignments.map((advisingAssignment, index) => {
          return (
            <IonItem key={index}>
              {`${advisingAssignment.AcademicYear} - ${advisingAssignment.DiplomaProgram} - ${advisingAssignment.DiplomaProgramYear} - ${advisingAssignment.DiplomaProgramSection}`}
            </IonItem>
          );
        })
      )}
    </IonList>
  );
};

export default AdvisingAssignmentsList;
