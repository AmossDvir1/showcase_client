interface ColoredChip {
  value: string;
  color: string;
  bgColor: string;
}

interface ProjectForm {
  projectName: string;
  projectDesc: string;
}
interface ProjectSlot {
  projectName: string;
  projectDesc: string;
  imageUrl?: string;
}

interface ProjectSlotDetails {
  id?: number;
  projectName: string;
  projectDesc: string;
}

interface UserDetails {
  usernme: string;
  firstName: string;
  lastName: string;
  id: string;
  accessToken?: string;
}

interface GlobalState {
isActivationToastShown: boolean;
}

type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

ResultsItemTypes = "profile" | "post" | "project";



interface ResultsItem {
  id: string;
  title: string;
  content: string;
  type: ResultsItemTypes;
  // Add other properties as needed
}