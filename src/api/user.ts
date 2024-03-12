import api from "./api"
import apiGet from "./apiGet";
export type IUser = {
  username: string;
  email?: string;
  phoneNumber?: string;
  roles: string[];
  password: string;
  dateOfBirth?: Date;
  gender: string;
  isActive: true;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Employment {
  title: string;
  key_skill: string;
}

interface Address {
  city: string;
  street_name: string;
  street_address: string;
  zip_code: string;
  state: string;
  country: string;
  coordinates: Coordinates;
}

interface CreditCard {
  cc_number: string;
}

interface Subscription {
  plan: string;
  status?: string;
  payment_method: string;
  term: string;
}

export interface ITable {
  id: number;
  uid: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  gender: string;
  phone_number: string;
  social_insurance_number: string;
  date_of_birth: string;
  employment: Employment;
  address: Address;
  credit_card: CreditCard;
  subscription: Subscription;
}

export type IEmployee = Pick<ITable, "id" | "date_of_birth" | "phone_number"  | "email" > & Pick<CreditCard, "cc_number"> & Pick<Subscription,"status">
export const getUser = () => {
  return api.get<IUser>('user/userInfo')
}
export const getTable = (size :number = 100) => {
  return apiGet.get<ITable[]>(`user/userInfo?size=${size}`)
}
