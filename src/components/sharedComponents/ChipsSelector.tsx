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
import { Typography } from "@mui/material";

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
  const onChipDelete = (e: any, id:string) => {
    setSelectedChips((prev) => prev.filter((chip) => chip._id !== id));
  };

  const onChipChange = (e: SelectChangeEvent<string[]>) => {
    let selected = e?.target?.value;
    // console.log(newChip)

    if (selected) {
      if (Array.isArray(selected)) {

        const newChips = availableChips.filter(chip => selected.includes(chip.label))
        newChips?.length > 0
          ? setSelectedChips(newChips ?? [])
          : setSelectedChips([]);
      } else {
      }
      // const newChip = availableChips?.find(chip => chip.label === value[0]);
      // if (newChip) {
      //   setSelectedChips((prev) => [...prev, newChip]);
      // }
      // On autofill we get a stringified value.
      // const chips = typeof value === "string" ? value.split(",") : value;
    }
  };

  return (
    <div className="pt-12">
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
          className="rounded-[20px]"
          required
          sx={{
            fontWeight: 400,
            "& .MuiSelect-iconOutlined": {
              display: selectedChips.length === 0 ? "" : "none",
            },
          }}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedChips?.map((chip) => chip.label) as never[]}
          onChange={onChipChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="technologygenre" />
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
                  onChipDelete={(e) => onChipDelete(e, value._id)}
                  // outlineColor={
                  //   availableChips?.find((colorSet) => colorSet.label === value)
                  //     ?.color ?? ""
                  // }
                ></Chip>
              ))}
            </Box>
          )}
          endAdornment={
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
          }
        >
          {/* <div className="overflow-y-scroll max-h-64"> */}
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
              {/* {item.label} */}
            </MenuItem>
          ))}
          {/* </div> */}
        </Select>
      </FormControl>
    </div>
  );
};

export default ChipsSelector;
