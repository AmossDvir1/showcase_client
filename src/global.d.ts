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
}

interface UserDetails {
  userStr: string;
  userId: string;
  urlMapping: string;
}

interface Comment {
  content: string;
  user: UserDetails;
  createdAt: string;
  updatedAt: string;
  _id: string;
  likes: string[];
  liked: boolean;
}

interface Post {
  content: string;
  _id: string;
  user: UserDetails;
  likes: string[];
  liked: boolean;
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
