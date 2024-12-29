
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
  imageOffset: ImageOffset;
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

interface ChipItem {
  _id: string;
  label: string;
  color?: string;
  icon?: string;
}

type ResultsItemTypes = "profile" | "post" | "project";

interface ResultsItem {
  id: string;
  title: string;
  content: string;
  type: ResultsItemTypes;
  urlMapping: string;
  icon?: PictureData;
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
  profilePicture?: PictureData;
  coverPhoto?: string | null;
  profile: IProfileSettings;
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

type NotificationType =
  | "friendRequest"
  | "comment"
  | "likePost"
  | "likeComment"
  | "";
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

interface Message {
  chatId?: string;
  content: string;
  createdAt: string;
  readBy?: string[];
  senderId: { id: string; username: string };
  updatedAt?: string;
  _id?: string;
}

interface IWork {
  jobTitle: string;
  workPlace: string;
  startedAt: Date;
  primary: boolean;
}

interface ICurrentCity {
  city: string;
  state: string;
  country: string;
}

interface IProfileSettings {
  technologies?: ChipItem[];
  bio?: string;
  work?: IWork[] | [];
  relationshipStatus?: string;
  currentCity?: ICurrentCity;
  from?: ICurrentCity;
}

interface IUserSettings {
  profile: IProfileSettings;
  security?: [];
}

interface LastMessage {
  content: string;
  createdAt: Date | null;
}

interface ChatPreview {
  friendId: string;
  chatId: string;
  lastMessage: LastMessage;
  friendDetails: UserDetails;
  isOnline: boolean;
}
interface ConversationId {
  id: string | number;
}

interface ImageOffset {
  x: number;
  y: number;
}

interface ImageDimensions {
  width: number;
  height: number;
}
