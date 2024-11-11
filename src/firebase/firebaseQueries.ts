import { collection, getDocs, query, orderBy, limit, startAfter, DocumentData } from "firebase/firestore";
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

export const fetchCustomerData = async (
  usersPerPage: number,
  lastVisibleDoc: DocumentData | null
): Promise<{ data: CustomerProps[]; lastVisibleDoc: DocumentData | null }> => {
  
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));
  // Build the query with pagination
  const customerCollection = collection(db, "customerData");
  const customerQuery = lastVisibleDoc
    ? query(customerCollection, startAfter(lastVisibleDoc), limit(usersPerPage))
    : query(customerCollection, limit(usersPerPage));

  const querySnapshot = await getDocs(customerQuery);

  const data = querySnapshot.docs.map((doc) => ({
    itemID: doc.id,
    date: doc.data().date,
    Verified: doc.data().Verified,
    country: doc.data().country,
    platform: doc.data().platform,
    userId: doc.data().userId,
  })) as CustomerProps[];

  // Determine the last visible document for pagination
  const newLastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

  return { data, lastVisibleDoc: newLastVisibleDoc };
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
