import { ReactNode } from "react";

export interface TFormData {
  username: string;
  password: string;
  email?: string;
}

export interface TFormProps {
  children: ReactNode;
  formData: TFormData;
  setFormData: () => {};
}
