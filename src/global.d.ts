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

type ImagePurpose = "cover" | "profile";

interface PictureData {
  filename: string;
  imageStringBase64: string;
  purpose: ImagePurpose;
  userId: string;
  id: string;
}

interface UserDetails {
  activated: boolean;
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  profilePicture: PictureData;
  updatedAt: string;
  urlMapping: string;
  username: string;
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

interface Comment {
  content: string;
  user: UserDetails;
  createdAt: string;
  updatedAt: string;
  _id: string;
  likes: UserDetails[];
}

interface Post {
  content: string;
  _id: string;
  user: UserDetails;
  likes: UserDetails[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
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
