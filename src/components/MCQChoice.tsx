import { IonButton, IonText } from "@ionic/react";


export const IncorrectChoice : React.FC<{option: string}> = (props) => {

  const choiceText = props.option;
  return(
    <IonButton>
      <IonText>
        {choiceText}
      </IonText>
    </IonButton>
  )
};


export const CorrectChoice : React.FC<{option: string}> = (props) => {

  const choiceText = props.option;

  return(
    <IonButton>
      <IonText>
        {choiceText}
      </IonText>
    </IonButton>
  )
};






