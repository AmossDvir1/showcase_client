// import { createContext, useState } from "react";

// export interface CreateProjectData {
//   projectName: string;
//   projecrDesc: string;
//   isExposed: string;
// }
// interface CreateProjectContextType {
//   dialogData: CreateProjectData;
//   setDialogData: React.Dispatch<React.SetStateAction<CreateProjectData>>;
// }
// export const CreateProjectContext = createContext<CreateProjectContextType>({
//   dialogData: { projectName: "", isExposed: "", projecrDesc: "" },
//   setDialogData: () => {},
// });

// interface CreateProjectProviderProps {
//   children: React.ReactNode;
//   values: CreateProjectContextType;
// }

// export const CreateProjectProvider: React.FC<CreateProjectProviderProps> = ({
//   children,
//   values,
// }) => {
//   return (
//     <CreateProjectContext.Provider value={values}>
//       {children}
//     </CreateProjectContext.Provider>
//   );
// };

import React, { createContext, useState, useContext, ReactNode } from "react";

interface FormData {
  projectName: string;
  projectDesc: string;
  isExposed: string;
}

interface CreateProjectContextType {
  formData: FormData;
  updateFormData: (newData: FormData) => void;
  getFormData: () => FormData | void;
}

const initialFormData: FormData = {
  projectName: "",
  projectDesc: "",
  isExposed: "",
};

export const CreateProjectContext = createContext<CreateProjectContextType>(
  {
      formData: { projectName: "", isExposed: "", projectDesc: "" },
      updateFormData: () => {},
      getFormData: () => {}
    }
);

interface FormProviderProps {
  children: ReactNode;
}

export const CreateProjectProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (newData: FormData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const getFormData = () =>  (formData || initialFormData);  

  const contextValue: CreateProjectContextType = {
    formData,
    updateFormData,
    getFormData,
  };

  return (
    <CreateProjectContext.Provider value={contextValue}>{children}</CreateProjectContext.Provider>
  );
};
