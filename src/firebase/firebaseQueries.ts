import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

// Ensure this structure matches the exact fields returned by Firebase.
interface AnalyticsProps {
  id: string;
  month: string;
  totalUsers?: number;
  newUsers?: number;
  totalDailyActiveUsers?: number;
  deleteUsers?: number;
  totalSessions?: number;
  verifiedUsers?: number;
  exclusiveContent?: number;
}

interface CustomerProps {
  itemID: string;
  date: string;
  Verified: boolean;
  country: string;
  platform: string;
  userId: string;
}

interface UserData {
  itemID: string;
  month: string;
  users: number;
}

export const fetchMonthlyAnalyticsData = async (): Promise<
  AnalyticsProps[]
> => {
  const querySnapshot = await getDocs(collection(db, "monthlyAnalyticsData"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as AnalyticsProps[];
};

export const fetchDailyAnalyticsData = async (): Promise<AnalyticsProps[]> => {
  const querySnapshot = await getDocs(collection(db, "dailyAnalyticsData"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as AnalyticsProps[];
};

export const fetchCustomerData = async (): Promise<CustomerProps[]> => {
  const querySnapshot = await getDocs(collection(db, "customerData")); // Replace "customers" with the actual collection name if different
  return querySnapshot.docs.map((doc) => ({
    itemID: doc.data().itemID,
    date: doc.data().date,
    Verified: doc.data().Verified,
    country: doc.data().country,
    platform: doc.data().platform,
    userId: doc.data().userId,
  })) as CustomerProps[];
};

export const fetchNewUserPerMonthData = async (): Promise<UserData[]> => {
  const querySnapshot = await getDocs(collection(db, "newUserPerMonthData"));
  return querySnapshot.docs.map((doc) => ({
    itemID: doc.data().itemID,
    month: doc.data().month,
    users: doc.data().users,
  })) as UserData[];
};

export const fetchMonthlyDeletedUsersData = async (): Promise<UserData[]> => {
  const querySnapshot = await getDocs(
    collection(db, "monthlyDeletedUsersData")
  );
  return querySnapshot.docs.map((doc) => ({
    itemID: doc.data().itemID,
    month: doc.data().month,
    users: doc.data().users,
  })) as UserData[];
};

export const fetchMonthlyActiveUsersData = async (): Promise<UserData[]> => {
  const querySnapshot = await getDocs(collection(db, "monthlyActiveUsersData"));
  return querySnapshot.docs.map((doc) => ({
    itemID: doc.data().itemID,
    month: doc.data().month,
    users: doc.data().users,
  })) as UserData[];
};
