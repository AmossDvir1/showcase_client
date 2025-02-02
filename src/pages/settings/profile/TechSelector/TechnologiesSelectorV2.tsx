import React, { useEffect, useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  rectIntersection,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { Dialog, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "../../../../components/sharedComponents/Typography";
import CustomButton from "../../../../components/sharedComponents/CustomButton";
import useMediaQuery from "../../../../components/responsiveness/useMediaQuery";


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
      <Typography className="text-md md:text-lg mb-4">{title}</Typography>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

const TechnologyItem: React.FC<{
  tech: Technology;
  disabled?: boolean;
  isDragging?: boolean;
  hideDelete?: boolean;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void;
  dragHandleProps?: any;
}> = ({ tech, disabled = false, isDragging = false, hideDelete = true, onDelete, dragHandleProps }) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(e, tech._id);
    }
  };

  return (
    <div
      className={`flex items-center p-2 my-2 rounded-md shadow-md touch-none 
        ${
          disabled
            ? "bg-gray-300 cursor-not-allowed dark:bg-dark-paper-light/25"
            : "dark:bg-dark-paper-light bg-paper cursor-move hover:bg-gray-200 dark:hover:bg-dark-paper-light/50"
        }
        ${isDragging ? "opacity-50" : "opacity-100"}
      `}
    >
      <div className="flex-grow flex items-center" {...dragHandleProps}>
        <img src={tech.icon} alt={tech.label} className="w-6 h-6 mr-4 rounded" />
        <Typography className={`text-sm md:text-md ${disabled ? 'cursor-not-allowed':'cursor-move'}`}>
          {tech.label}
        </Typography>
      </div>
      {!hideDelete && (
        <div 
          className="flex items-center" 
          onClick={e => e.stopPropagation()}
          onPointerDown={e => e.stopPropagation()}
          onMouseDown={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
        >
          <IconButton
            size="small"
            onClick={handleDelete}
            className="ml-2 p-0"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

const DraggableTechnology: React.FC<{
  tech: Technology;
  disabled?: boolean;
}> = ({ tech, disabled = false }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: tech._id,
    disabled,
    data: {
      type: 'available',
      tech,
    },
  });

  return (
    <div ref={setNodeRef}>
      <TechnologyItem 
        tech={tech} 
        disabled={disabled}
        isDragging={isDragging}
        dragHandleProps={{...attributes, ...listeners}}
      />
    </div>
  );
};

const SortableTechnology: React.FC<{
  tech: Technology;
  onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void;
}> = ({ tech, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useSortable({
    id: `selected-${tech._id}`,
    data: {
      type: 'selected',
      tech,
    },
  });

  return (
    <div ref={setNodeRef}>
      <TechnologyItem 
        tech={tech}
        isDragging={isDragging}
        hideDelete={false}
        onDelete={onDelete}
        dragHandleProps={{...attributes, ...listeners}}
      />
    </div>
  );
};

const TechnologiesSelectorV2: React.FC<Props> = ({
  availableTechnologies,
  selectedTechnologies,
  setSelectedTechnologies,
}) => {
  const isMobile = useMediaQuery(500);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [disabledTechnologies, setDisabledTechnologies] = useState<string[]>([]);
  const [activeDragData, setActiveDragData] = useState<{
    id: string;
    tech: Technology;
    type: 'available' | 'selected';
  } | null>(null);

  useEffect(() => {
    if (selectedTechnologies?.length > 0) {
      setDisabledTechnologies(selectedTechnologies.map((tech) => tech._id));
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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveDragData({
      id: active.id as string,
      tech: active.data.current?.tech as Technology,
      type: active.data.current?.type as 'available' | 'selected',
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragData(null);

    if (!over) return;

    // Handle sorting within selected panel
    if (active.data.current?.type === 'selected' && over.id.toString().startsWith('selected-')) {
      const oldIndex = selectedTechnologies.findIndex(
        (tech) => `selected-${tech._id}` === active.id
      );
      const newIndex = selectedTechnologies.findIndex(
        (tech) => `selected-${tech._id}` === over.id
      );

      if (oldIndex !== newIndex) {
        setSelectedTechnologies((techs) => arrayMove(techs, oldIndex, newIndex));
      }
      return;
    }

    // Handle dropping from available to selected
    if (
      active.data.current?.type === 'available' &&
      over.id.toString().startsWith('selected-')
    ) {
      const draggedTech = active.data.current.tech as Technology;
      
      // Only proceed if the technology isn't already selected
      if (!selectedTechnologies.find((t) => t._id === draggedTech._id)) {
        // Find the index where we should insert the new item
        const overIndex = selectedTechnologies.findIndex(
          (tech) => `selected-${tech._id}` === over.id
        );

        setSelectedTechnologies((prev) => {
          const newTechs = [...prev];
          // Insert the new technology at the target position
          newTechs.splice(overIndex, 0, draggedTech);
          return newTechs;
        });
        
        setDisabledTechnologies((prev) => [...prev, draggedTech._id]);
      }
    } else if (
      // Handle dropping on the empty selected panel
      active.data.current?.type === 'available' &&
      over.id === 'selected-panel'
    ) {
      const draggedTech = active.data.current.tech as Technology;
      
      if (!selectedTechnologies.find((t) => t._id === draggedTech._id)) {
        setSelectedTechnologies((prev) => [...prev, draggedTech]);
        setDisabledTechnologies((prev) => [...prev, draggedTech._id]);
      }
    }
  };

  const handleDeleteTechnology = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>,techId: string) => {
    e.stopPropagation();
    e.preventDefault();
    const techToReEnable = selectedTechnologies.find(
      (tech) => tech._id === techId
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
        size={isMobile ? "small" : "medium"}
        onClick={() => setDialogOpen(true)}
      >
        Open Knowledge Selector
      </CustomButton>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="md"
        fullScreen={isMobile}
      >
        <DndContext
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
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
                      <Typography className="text-md md:text-lg ml-2">
                        {currentCategory}
                      </Typography>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {categorizedTechnologies
                        .find((group) => group.category === currentCategory)
                        ?.technologies.map((tech) => (
                          <DraggableTechnology
                            key={tech._id}
                            tech={tech}
                            disabled={disabledTechnologies.includes(tech._id)}
                          />
                        ))}
                    </div>
                  </>
                ) : (
                  <>
                    <Typography className="text-md md:text-lg mb-4">
                      Select a Category
                    </Typography>
                    <div className="space-y-3 h-full overflow-y-auto">
                      {categorizedTechnologies.map((group) => (
                        <div
                          key={group.category}
                          className="p-2 dark:bg-dark-paper-light bg-paper rounded-md shadow-md cursor-pointer hover:bg-gray-200"
                          onClick={() => handleCategoryClick(group.category)}
                        >
                          <Typography className="text-sm md:text-md cursor-pointer">
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
                <SortableContext
                  items={selectedTechnologies.map((tech) => `selected-${tech._id}`)}
                  strategy={verticalListSortingStrategy}
                >
                  {selectedTechnologies.map((tech) => (
                    <SortableTechnology
                      key={`selected-${tech._id}`}
                      tech={tech}
                      onDelete={handleDeleteTechnology}
                    />
                  ))}
                </SortableContext>
              </DroppablePanel>
            </div>
          </div>

          <DragOverlay>
            {activeDragData ? (
              <TechnologyItem 
                tech={activeDragData.tech}
                hideDelete={activeDragData.type === 'available'}
                onDelete={handleDeleteTechnology}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </Dialog>
    </div>
  );
};

export default TechnologiesSelectorV2;