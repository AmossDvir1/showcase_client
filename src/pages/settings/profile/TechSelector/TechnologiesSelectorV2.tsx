import React, { useEffect, useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  rectIntersection,
} from "@dnd-kit/core";
import { Dialog, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "../../../../components/sharedComponents/Typography";
import CustomButton from "../../../../components/sharedComponents/CustomButton";

interface Props {
  availableTechnologies: Technology[];
  selectedTechnologies: Technology[];
  setSelectedTechnologies: React.Dispatch<React.SetStateAction<Technology[]>>;
}

const DroppablePanel: React.FC<{
  id: string;
  title: string;
  children: React.ReactNode;
}> = ({ id, title, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      id={id}
      className="w-1/2 p-4 dark:bg-dark-paper bg-paper-dark rounded-md shadow-md flex flex-col h-[60vh]"
    >
      <Typography className="text-lg font-medium mb-4">{title}</Typography>
      {children}
    </div>
  );
};

const DraggableTechnology: React.FC<{
  tech: Technology;
  disabled?: boolean;
  onDragStart?: () => void;
}> = ({ tech, disabled = false, onDragStart }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tech._id,
    disabled,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: disabled ? 0.5 : 1,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`flex items-center p-2 my-2 rounded-md shadow-md 
        ${
          disabled
            ? "bg-gray-300 cursor-not-allowed dark:bg-dark-paper-light/25"
            : "dark:bg-dark-paper-light bg-paper cursor-move hover:bg-gray-200 dark:hover:bg-dark-paper-light/50"
        }`}
    >
      <img src={tech.icon} alt={tech.label} className="w-6 h-6 mr-4 rounded" />
      <Typography className="font-medium">{tech.label}</Typography>
    </div>
  );
};

const SortableTechnology: React.FC<{
  tech: Technology;
  onDelete: (id: string) => void;
}> = ({ tech, onDelete }) => {
  // Remove useSortable and replace with simple sorting
  return (
    <div className="flex items-center p-2 my-2 dark:bg-dark-paper-light bg-paper rounded-md shadow-md">
      <div className="flex-grow flex items-center">
        <img
          src={tech.icon}
          alt={tech.label}
          className="w-6 h-6 mr-4 rounded"
        />
        <Typography className="font-medium">{tech.label}</Typography>
      </div>
      <IconButton
        size="small"
        onClick={() => onDelete(tech._id)}
        className="ml-2 p-0"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

const TechnologiesSelectorV2: React.FC<Props> = ({
  availableTechnologies,
  selectedTechnologies,
  setSelectedTechnologies,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const [disabledTechnologies, setDisabledTechnologies] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (selectedTechnologies?.length > 0) {
      setDisabledTechnologies(selectedTechnologies.map((tech:Technology) => tech._id));
    } else {
      setDisabledTechnologies([]);
    }
  }, []);

  const categories = Array.from(
    new Set(availableTechnologies.map((tech) => tech.category))
  );

  const categorizedTechnologies = categories.map((category) => ({
    category,
    technologies: availableTechnologies.filter(
      (tech) => tech.category === category
    ),
  }));

  const handleDragEnd = (event: any) => {
    const { active, over, collisions } = event;

    // Check if dropped over the selected panel area
    const isDroppedOnSelectedPanel = collisions?.some(
      (collision: any) => collision.id === "selected-panel"
    );

    if (isDroppedOnSelectedPanel) {
      const draggedTech = availableTechnologies.find(
        (tech) => tech._id === active.id
      );

      if (
        draggedTech &&
        !selectedTechnologies.find((t) => t._id === draggedTech._id)
      ) {
        // Create a new object to break the reference
        const newTech = { ...draggedTech };

        setSelectedTechnologies((prev) => [...prev, newTech]);
        setDisabledTechnologies((prev) => [...prev, draggedTech._id]);
      }
    }
  };

  const handleDeleteTechnology = (techId: string) => {
    // Find the original technology to re-enable
    const techToReEnable = selectedTechnologies.find(
      (tech) => `selected-${tech._id}` === techId || tech._id === techId
    );

    if (techToReEnable) {
      setSelectedTechnologies((prev) =>
        prev.filter((tech) => tech._id !== techToReEnable._id)
      );
      setDisabledTechnologies((prev) =>
        prev.filter((id) => id !== techToReEnable._id)
      );
    }
  };

  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
  };

  const handleBack = () => {
    setCurrentCategory(null);
  };

  return (
    <div>
      <CustomButton
        className="px-4 py-2"
        onClick={() => setDialogOpen(true)}
      >
        Open Knowledge Selector
      </CustomButton>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DndContext
          collisionDetection={rectIntersection}
          onDragEnd={handleDragEnd}
        >
          <div className="p-4 flex flex-col h-[70vh] overflow-hidden">
            <div className="flex items-center justify-between pb-4">
              <Typography className="text-lg font-medium">
                Manage Your Technologies
              </Typography>
              <IconButton size="small" onClick={() => setDialogOpen(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="flex flex-1 gap-4">
              {/* Inventory Panel */}
              <div className="w-1/2 p-4 dark:bg-dark-paper bg-paper-dark rounded-md shadow-md flex flex-col h-[60vh]">
                {currentCategory ? (
                  <>
                    <div className="flex items-center mb-4">
                      <IconButton onClick={handleBack}>
                        <ArrowBackIcon />
                      </IconButton>
                      <Typography className="text-lg font-medium ml-2">
                        {currentCategory}
                      </Typography>
                    </div>
                    {categorizedTechnologies
                      .find((group) => group.category === currentCategory)
                      ?.technologies.map((tech) => (
                        <DraggableTechnology
                          key={tech._id}
                          tech={tech}
                          disabled={disabledTechnologies.includes(tech._id)}
                        />
                      ))}
                  </>
                ) : (
                  <>
                    <Typography className="text-lg font-medium mb-4">
                      Select a Category
                    </Typography>
                    <div className="space-y-3 h-full overflow-y-auto">
                      {categorizedTechnologies.map((group) => (
                        <div
                          key={group.category}
                          className="p-4 dark:bg-dark-paper-light bg-paper rounded-md shadow-md cursor-pointer hover:bg-gray-200"
                          onClick={() => handleCategoryClick(group.category)}
                        >
                          <Typography className="font-medium">
                            {group.category}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Selected Panel */}
              <DroppablePanel id="selected-panel" title="Selected Technologies">
                {selectedTechnologies.map((tech) => (
                  <SortableTechnology
                    key={tech._id}
                    tech={tech}
                    onDelete={handleDeleteTechnology}
                  />
                ))}
              </DroppablePanel>
            </div>
          </div>
        </DndContext>
      </Dialog>
    </div>
  );
};

export default TechnologiesSelectorV2;
