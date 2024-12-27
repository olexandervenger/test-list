import { FC, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import { InputCoutry } from "./InputCoutry";
import { ListCountry } from "./List";
import useDebounce from "./useDebounce";
import { arr, CountryType } from "../../../country";
import { FormControlLabel } from "@mui/material";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export type CountryArrType = (CountryType | number)[];
const Wrapper = styled("div")`
  padding: 20px;
  margin-top: 50px;
  position: relative;
  width: 494px;

  background: #ffffff;
  border: 1px solid #e1e3e6;
  box-shadow: 9px 32px 35px rgba(0, 0, 0, 0.0464653);
  border-radius: 14px;
  box-sizing: border-box;
`;
const WrappSelectedSwitch = styled("div")`
  width: 100%;
  height: 100%;
  margin-left: -8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: "Campton";
  font-style: normal;
  font-weight: 550;
  font-size: 16px;
  line-height: 22px;

  letter-spacing: -0.5px;

  color: #232323;
`;
const WrappClear = styled("div")`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: "Campton";
  font-style: normal;
  font-weight: 550;
  font-size: 16px;
  line-height: 22px;

  letter-spacing: -0.5px;

  color: #232323;
  .clear {
    cursor: pointer;
  }
`;
const DividerCustom = styled(Divider)`
  margin-top: 12.44px;
`;
const WrappSave = styled("div")`
  width: 100%;
  height: 58px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
const SaveBtn = styled("div")`
  width: 87px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #60d09b;
  border-radius: 50px;
  font-family: 'Campton', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  text-align: center;
  letter-spacing: -0.5px;

  color: #ffffff;
`;
const ContainerMain = styled("div")`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CountryPopup: FC<{}> = () => {
  const [checked, setChecked] = useState(false);
  const [checkedList, setCheckedList] = useState<CountryArrType>([0]);
  const [checkedListOnly, setCheckedListOnly] = useState<CountryType[]>([]);

  const switchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const [value, setValue] = useState<string>("");
  const [filteredCountries, setFilteredCountries] =
    useState<CountryType[]>(arr);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };
  const debouncedSearchTerm = useDebounce(value, 200);
  useEffect(() => {
    const filtered = arr.filter((country) =>
      country.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [debouncedSearchTerm]);
  useEffect(() => {
    const intersectedArray = filteredCountries.filter((element: CountryType) =>
      checkedList.includes(element)
    );
    setCheckedListOnly(intersectedArray);
  }, [checkedList, filteredCountries]);
  const clearList = () => {
    setCheckedList([0]);
  };
  return (
    <ContainerMain>
      <Wrapper>
        <Grid container>
          <Grid item xs={12} sx={{
            paddingBottom: '10px'
          }}>
            <InputCoutry value={value} onChange={onChange} />
            <DividerCustom />
          </Grid>

          <Grid item xs={6}>
            <WrappSelectedSwitch>
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={checked}
                    onChange={switchHandler}
                    sx={{ m: 1, ml: 2.3 }}
                  />
                }
                label="Show selected only"
                sx={{fontSize: '200px'}}
              />
            </WrappSelectedSwitch>
          </Grid>
          <Grid item xs={6} alignItems="start" justifyContent="flex-end">
            <WrappClear>
              <div className="clear" onClick={() => clearList()}>
                Clear all
              </div>
            </WrappClear>
          </Grid>
          <Grid item xs={12}>
            <ListCountry
              filteredCountries={checked ? checkedListOnly : filteredCountries}
              checked={checkedList}
              setChecked={setCheckedList}
            />
            <DividerCustom />
          </Grid>
          <Grid item xs={12}>
            <WrappSave>
              <SaveBtn>Save</SaveBtn>
            </WrappSave>
          </Grid>
        </Grid>
      </Wrapper>
    </ContainerMain>
  );
};
