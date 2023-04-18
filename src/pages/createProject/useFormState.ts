import { useEffect, useState } from "react";

export const useFormState = (state: ProjectForm) => {
  const [currentFormState, setCurrentFormState] = useState<ProjectForm>(state);
  const [initialFormState, setInitialFormState] = useState<ProjectForm>(state);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  useEffect(() => {
    // setCurrentFormState(state);
    setIsDirty(checkDirty(state));
  }, [state, initialFormState]);

const checkDirty = (state: ProjectForm): boolean => {
  const keys = Object.keys(state) as Array<keyof ProjectForm>;
  for (const key of keys) {
    if (state[key] !== initialFormState[key]) {
      return true;
    }
  }
  return false;
};
  return isDirty;
};
