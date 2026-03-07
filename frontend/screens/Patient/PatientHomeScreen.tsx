


                            // Rivithi and Nadithi when you are done with PatientProfileScreen uncomment line 18








import React, { useEffect } from "react";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchConsultations } from "../../store/consultationSlice";
import ConsultationCard from "../../components/features/ConsultationCard/ConsultationCard";
//import PatientProfileScreen from "./PatientProfileScreen"; <-- After create the Profile screen consider this

const PatientHomeScreen = () => {
  const dispatch = useAppDispatch();
  const { consultations } = useAppSelector((state) => state.consultation);

  useEffect(() => {
    dispatch(fetchConsultations());
  }, []);

  return (
    <View>
      {consultations.map((consult) => (
        <ConsultationCard key={consult._id} consultationId={consult._id} />
      ))}
    </View>
  );
};

export default PatientHomeScreen;