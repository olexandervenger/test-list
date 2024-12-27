import { FC } from "react";
import { styled } from "@mui/material/styles";

const InputCustom = styled("input")`
  outline: none;
  border: none;
  font-family: "Campton";
  font-style: normal;
  font-weight: 475;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.5px;
  width: 100%;
  color: #343434;
  padding: 0;
`;
export const InputCoutry: FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => {
  return (
    <>
      <InputCustom value={value} onChange={onChange} placeholder="Search" />
    </>
  );
};
