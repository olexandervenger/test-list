import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { FC } from "react";
import { CountryType } from "../../../../country";
import { CountryArrType } from "..";

const ListBox = styled(List)`
  width: 100%;
  height: 270px;
  overflow: auto;
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar {
    width: 12px;
    background-color: #fff;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(52, 52, 52, 0.51);
  }
`;
const ListCustom = styled(ListItem)`
  height: 42px;
`;
const ItemWrap = styled(Box)({
  paddingLeft: '8px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
});

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 8,
  border: "none",
  width: 22,
  height: 22,
  backgroundColor: "#ECECEC",
  padding: 0,
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#457DF1",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 22,
    height: 22,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

function BpCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{
        ml: -2,
        "&:hover": { bgcolor: "transparent" },
      }}
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export const ListCountry: FC<{
  filteredCountries: CountryType[];
  checked: CountryArrType;
  setChecked: (arr: CountryArrType) => void;
}> = ({ filteredCountries, checked, setChecked }) => {
  const handleToggle = (value: CountryType) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <ListBox>
      {filteredCountries.length < 1 ? (
        "empty"
      ) : (
        <>
          {filteredCountries.map((value) => {
            const labelId = `checkbox-list-label-${value.name}`;

            return (
              <ListCustom key={value.name} disablePadding>
                <ItemWrap onClick={handleToggle(value)}>
                  <BpCheckbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />

                  <ListItemText id={labelId} primary={value.name} />
                </ItemWrap>
              </ListCustom>
            );
          })}
        </>
      )}
    </ListBox>
  );
};
