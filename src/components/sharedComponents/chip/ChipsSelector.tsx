import React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { Chip } from "./Chip";
import Typography from "../Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
interface Props {
  setSelectedChips: React.Dispatch<React.SetStateAction<ChipItem[]>>;
  selectedChips: ChipItem[];
  availableChips: ChipItem[];
}

const ChipsSelector: React.FC<Props> = ({
  availableChips,
  setSelectedChips,
  selectedChips,
}) => {
  const [open, setOpen] = React.useState(false);
  const onChipDelete = (e: any, id: string) => {
    setSelectedChips((prev) => prev.filter((chip) => chip._id !== id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const toggleOpenClose = () => {
    setOpen((prev) => !prev);
  };

  const onChipChange = (e: SelectChangeEvent<string[]>) => {
    let selected = e?.target?.value;

    // Handle autofill case: Normalize stringified value into an array
    const normalized =
      typeof selected === "string" ? selected.split(",") : selected;

    if (normalized) {
      if (Array.isArray(selected)) {
        const newChips = availableChips.filter((chip) =>
          normalized.includes(chip.label)
        );
        newChips?.length > 0
          ? setSelectedChips(newChips ?? [])
          : setSelectedChips([]);
      }
    }
  };

  return (
    <div>
      <FormControl
        sx={{
          width: "100%",
          ".MuiList-root-MuiMenu-list": { maxHeight: "250px" },
        }}
        size="medium"
      >
        <InputLabel sx={{ fontWeight: 400 }} id="demo-multiple-chip-label">
          Pick Technologies
        </InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          className="rounded-[20px]"
          required
          sx={{
            fontWeight: 400,
  
          }}
          labelId="demo-multiple-chip-label"
          multiple
          value={selectedChips?.map((chip) => chip.label) as never[]}
          onChange={onChipChange}
          IconComponent={() => (
            <IconButton
              className="p-0"
              sx={{ marginX: selectedChips.length === 0 ? "" : "10px" }}
              onClick={toggleOpenClose}
            >
              <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
            </IconButton>
          )}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Pick Technologies"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selectedChips?.map((value: ChipItem, index) => (
                <Chip
                  id={value._id}
                  radius={9}
                  size="small"
                  key={`${index}_${value}`}
                  label={value.label}
                  iconSrc={value.icon}
                  onChipDelete={(e) => onChipDelete(e, value._id)}
                ></Chip>
              ))}
            </Box>
          )}
          endAdornment={
            selectedChips.length > 0 ? (
              <IconButton
                sx={{ visibility: selectedChips ? "visible" : "hidden" }}
                onClick={() => setSelectedChips([])}
              >
                <ClearIcon
                  sx={{
                    display: selectedChips.length === 0 ? "none" : "",
                    position: "absolute",
                  }}
                />
              </IconButton>
            ) : (
              <></>
            )
          }
          MenuProps={{
            disableScrollLock: true,

            PaperProps: {
              style: {
                maxHeight: 250, // Set maximum height in pixels
                width: "300px", // Optional: Set a fixed width for the dropdown
              },
            },
          }}
        >
          {availableChips.map((item: ChipItem) => (
            <MenuItem className="py-1" key={item._id} value={item.label}>
              <div className="py-0 my-0 flex items-center">
                {item?.icon && (
                  <img
                    className="w-6 pr-5"
                    src={item.icon}
                    alt={item.label}
                  ></img>
                )}
                <Typography>{item.label}</Typography>
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ChipsSelector;
