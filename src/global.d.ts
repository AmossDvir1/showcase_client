interface ColoredChip {
    value: string;
    color: string;
    bgColor:string;
  }

interface ProjectForm {
  projectName:string;
  projectDesc:string;
}
interface ProjectSlot {
  projectName:string;
  projectDesc:string;
  imageUrl?: string;
}