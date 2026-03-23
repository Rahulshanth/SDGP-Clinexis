import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export type SignInPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  role: string;
  profile: {
    name: string;                  // required for all roles
    phoneNumber?: string;          // optional
    specialization?: string;       // doctor only
    hospitalName?: string;         // doctor only
    clinicLocation?: string;       // doctor only
  };
};

export type RegisterPharmacyPayload = {
  email: string;
  password: string;
  role: string;
  profile: { name: string };
  pharmacyDetails: {
    name: string;
    location: string;
    contactNumber: string;
    medicines?: string[];
  };
};

export type SignInResponse = {
  user: any;
  accessToken: string;
};

export const signInUser = async (
  payload: SignInPayload
): Promise<SignInResponse> => {
  //const response = await api.post("/auth/SignIn", payload);
  const response = await api.post("/auth/login", payload);

  if (response.data?.accessToken) {
    await AsyncStorage.setItem("token", response.data.accessToken); 
    //await AsyncStorage.setItem("accessToken", response.data.accessToken);
  }

  if (response.data?.user?.role) {
    await AsyncStorage.setItem("userRole", response.data.user.role);
  }

  return response.data;
};

export const registerUser = async (payload: RegisterPayload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const registerPharmacyUser = async (
  payload: RegisterPharmacyPayload
) => {
  // Step 1: Create user account in users collection
  const userResponse = await api.post("/auth/register", {
    email: payload.email,
    password: payload.password,
    role: "pharmacy",
    profile: { name: payload.pharmacyDetails.name },
  });

  try {
    // Step 2: Create pharmacy profile in pharmacyprofiles collection
    await api.post("/api/pharmacy-profile", {
      name: payload.pharmacyDetails.name,
      email: payload.email,
      location: payload.pharmacyDetails.location,
      contactNumber: payload.pharmacyDetails.contactNumber,
      medicines: payload.pharmacyDetails.medicines || [],
    });
  } catch (profileError) {
    // ⚠️ Step 2 failed — user account was created but profile failed
    console.log("Profile creation failed:", profileError);
    throw new Error("Account created but profile setup failed. Please try logging in.");
  }

  return userResponse.data;
  
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem("accessToken");
};

export const getStoredToken = async () => {
  return AsyncStorage.getItem("accessToken");
};

export const getPatientRecords = async () => {
  const response = await api.get("/patient/records");
  return response.data;
};