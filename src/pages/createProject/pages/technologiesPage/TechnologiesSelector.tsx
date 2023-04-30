import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import {
  Controller,
  FieldValues,
  UseFormRegister,
  useFormContext,
} from "react-hook-form";
import { OutlinedInput } from "@mui/material";
import { Chip } from "../../../../components/Chip";
import {
  generateRandomColorString,
  getAvarageRGBValue,
} from "../../../../utils/utils";

var colors = new Array(1000)
  .fill(null)
  .map((elem) => generateRandomColorString(0.7));

interface Props extends SelectProps {
  register: UseFormRegister<FieldValues>;
  items: string[];
  name: string;
  defaultValue: never[];
}

export const TechnologiesSelector: React.FC<Props> = ({
  items,
  name,
  defaultValue = [],
}) => {
  const [availableChips, setAvailableChips] = useState<ColoredChip[] | []>([]);
  const { setValue, watch, control } = useFormContext(); // retrieve all hook methods
  const selected = watch(name) ?? [];

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
    setAvailableChips(colorSets);
  }, [items]);

  const onChipDelete = (e: any, value: string) => {
    setValue(
      name,
      selected.filter((chip: string) => chip !== value)
    );
  };

  return (
    <div className="pt-12">
      <FormControl sx={{ width: "100%" }} size="medium">
        <InputLabel
          sx={{ fontWeight: 400 }}
          className=""
          id="demo-multiple-chip-label"
        >
          Pick Technologies
        </InputLabel>
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Select
              multiple
              input={<OutlinedInput className="w-full" id="select-multiple-chip" label="PickTechnologies" />}
              className="rounded-[30px]"
              {...field}
              renderValue={(value) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {selected.map((value: string, index: number) => (
                    <Chip
                      key={`${index}_${value}`}
                      value={value}
                      onChipDelete={onChipDelete}
                      labelColor={
                        availableChips?.find(
                          (colorSet) => colorSet.value === value
                        )?.color ?? ""
                      }
                      bgColor={
                        availableChips?.find(
                          (colorSet) => colorSet?.value === value
                        )?.bgColor ?? ""
                      }
                    ></Chip>
                  ))}
                </Box>
              )}
              endAdornment={
                selected.length > 0 && (
                  <IconButton
                    className={`${selected ? "visible" : "invisible"}`}
                    onClick={() => setValue(name, [])}
                  >
                    {selected.length > 0 && <ClearIcon />}
                  </IconButton>
                )
              }
              value={selected}
              onChange={(e) => setValue(name, e.target.value)}
            >
              {items.map((item: string | number) => (
                <MenuItem key={item} value={item} selected={false}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          )}
        ></Controller>
      </FormControl>
    </div>
  );
};
