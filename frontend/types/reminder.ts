// ALL ADD by VIDU*
export interface Reminder {
  patientId: string;
  type: "MEDICINE" | "APPOINTMENT";
  reminderTime: string;
  message: string;
}
