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
  title: string;
  description: string;
  isExposed: boolean;
}

interface UserDetails {
  profilePicture: {imageStringBase64: string, filename: string, userId:string};
  username: string;
  firstName: string;
  lastName: string;
  id: string;
  urlMapping:string;
  accessToken?: string;
}

interface Media {
  userId: string;
  imageStringBase64: string;
}

interface GlobalState {
  isActivationToastShown: boolean;
}

type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type ResultsItemTypes = "profile" | "post" | "project";

interface ResultsItem {
  id: string;
  title: string;
  content: string;
  type: ResultsItemTypes;
  urlMapping: string;
  // Add other properties as needed
}

type RelationshipState =
  | "no_relationship"
  | "pending_approval"
  | "request_sent"
  | "friends"
  | "block_first_second"
  | "block_second_first";

interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  id: string;
  urlMapping: string;
  profilePicture?: string | null;
  coverPhoto?: string | null;
}

type ImagePurpose = "cover" | "profile";

interface Comment {
  content: string;
  user: UserDetails;
  createdAt: string;
  updatedAt: string;
  _id: string;
  likes: UserInfo[];
}

interface Post {
  content: string;
  _id: string;
  user: UserDetails;
  likes: UserInfo[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

interface UserInfo {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  _id: string;
  urlMapping: string;
  // Add other user info properties as needed
}

type NotificationType = "friend_request" | "comment" | "like" | "";
type NotificationStatus = "read" | "unread";

interface INotification {
  _id: string;
  content: string;
  sender: string;
  type: NotificationType;
  status: NotificationStatus;
  timestamp: Date | string;
  extraData: string;
}
