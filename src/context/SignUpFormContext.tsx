import { createContext, useState } from "react";

interface SignUpFormData  {
  username: string;
  email: string;
  password: string;
}
interface SignUpFormContextType {
  formData: SignUpFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
}
export const SignUpFormContext = createContext<SignUpFormContextType>({
  formData: { username: '', password: '', email: '' },
  setFormData: () => {console.log()},
});

interface SignUpFormProviderProps {
  children: React.ReactNode;
}

export const SignUpFormProvider: React.FC<SignUpFormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: '',
    password: '',
    email: '',
  });

  return (
    <SignUpFormContext.Provider value={{ formData, setFormData }}>
      {children}
    </SignUpFormContext.Provider>
  );
};
;