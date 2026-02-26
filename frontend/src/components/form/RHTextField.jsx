import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const RHTextField = ({ name, label, defaultValue, rules, size, ...props }) => {
  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={defaultValue ? defaultValue : ""}
      render={({ field, fieldState }) => {
        return (
          <TextField
            inputRef={field.ref}
            {...field}
            onKeyDown={(e) => {
              if (e.shiftKey || e.charCode === 13 || e.keyCode === 13) {
                field.onChange(field.value);
              }
              props.onKeyDown && props.onKeyDown(e);
            }}
            placeholder={props.placeholder}
            className={props.className || ""}
            label={label}
            style={props.style || { width: "100%" }}
            helperText={fieldState?.error && fieldState?.error?.message}
            error={Boolean(fieldState?.error)}
            size={props.size || "small"}
            multiline={props.multiline}
            rows={props.rows}
            variant={props.variant || "outlined"}
            fullWidth={props.fullWidth || true}
            InputProps={props.InputProps}
            {...props}
            value={field.value ? field.value : ""}
            onChange={(event) => {
              field.onChange(event.target.value);
              props.onChange && props.onChange(event);
            }}
          />
        );
      }}
    />
  );
};

export default RHTextField;
