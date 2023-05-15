import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { Chip } from "../../../../components/Chip";
import {
  generateRandomColorString,
  getAvarageRGBValue,
} from "../../../../utils/utils";

var colors = new Array(1000)
  .fill(null)
  .map((elem) => generateRandomColorString(0.7));

interface Props {
  setSelectedChips: (list: (ColoredChip | undefined)[] | []) => void;
  items: string[];
}

export const TechnologiesSelector: React.FC<Props> = ({
  items,
  setSelectedChips,
}) => {
  const [chipsPicked, setChipsPicked] = useState<string[] | never[]>([]);
  const [availableGenres, setAvailableGenres] = useState<ColoredChip[] | []>(
    []
  );

  useEffect(() => {
    const colorSets = items.map((item, index: number) => {
      let color = colors[index];
      return {
        value: item,
        color:
          getAvarageRGBValue(color) > 127 ? "rgb(0,0,0)" : "rgb(255,255,255)",
        bgColor: color,
      };
    });
    setAvailableGenres(colorSets);
  }, [items]);

  const onChipDelete = (e: any, value: string) => {
    onUpdateGenres(chipsPicked.filter((chip) => chip !== value));
  };

  const onUpdateGenres = (chips: string[]) => {
    setChipsPicked(chips);
    const chipsWithColors = chips.map((chip) =>
      availableGenres.find((colorSet) => colorSet.value === chip)
    );

    setSelectedChips(chipsWithColors ?? []);
  };

  const onChipChange = (event: SelectChangeEvent<never[]>) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const chips = typeof value === "string" ? value.split(",") : value;

    const chipsWithColors = chips.map((chip) =>
      availableGenres.find((colorSet) => colorSet.value === chip)
    );
    setChipsPicked(chips);
    chipsWithColors && setSelectedChips(chipsWithColors ?? []);
  };

  return (
    <div className="pt-12">
      <FormControl sx={{ width: "100%" }} size="medium">
        <InputLabel sx={{ fontWeight: 400 }} id="demo-multiple-chip-label">
          Pick Genres
        </InputLabel>
        <Select
          className="rounded-[30px]"
          required
          sx={{
            fontWeight: 400,
            "& .MuiSelect-iconOutlined": {
              display: chipsPicked.length === 0 ? "" : "none",
            },
          }}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          //   value={''}
          value={chipsPicked as Array<never>}
          onChange={onChipChange}
          input={<OutlinedInput id="select-multiple-chip" label="pickgenre" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selected.map((value, index) => (
                <Chip
                  key={`${index}_${value}`}
                  value={value}
                  onGenreDelete={onChipDelete}
                  labelColor={
                    availableGenres?.find(
                      (colorSet) => colorSet.value === value
                    )?.color ?? ""
                  }
                  bgColor={
                    availableGenres?.find(
                      (colorSet) => colorSet?.value === value
                    )?.bgColor ?? ""
                  }
                ></Chip>
              ))}
            </Box>
          )}
          endAdornment={
            <IconButton
              sx={{ visibility: chipsPicked ? "visible" : "hidden" }}
              onClick={() => onUpdateGenres([])}
            >
              <ClearIcon
                sx={{
                  display: chipsPicked.length === 0 ? "none" : "",
                  position: "absolute",
                }}
              />
            </IconButton>
          }
        >
          {items.map((item: string | number) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
