import * as React from "react";
import "./App.css";

import Table from "./components/Table";
import Menu from "./components/Menu";
import MyAppBar from "./components/MyAppBar";
import Modal from "./components/Modal/Modal";

import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import axios from "axios";

function App() {
  const [data, setData] = React.useState([]);
  const [addModalActive, setAddModalActive] = React.useState(false);
  const [editModalActive, setEditModalActive] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [sex, setSex] = React.useState("");
  const [name, setName] = React.useState("");
  const [job, setJob] = React.useState("");
  const [currentDate, setCurrentDate] = React.useState(null);
  const [currentSex, setCurrentSex] = React.useState("");
  const [currentName, setCurrentName] = React.useState("");
  const [currentJob, setCurrentJob] = React.useState("");

  const onClickAdd = () => {
    axios
      .post(" https://62f503b3535c0c50e767cf0c.mockapi.io/api/v1/tasks", {
        birthday: new Date(date).toJSON(),
        name,
        sex,
        job,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setDate(null);
    setSex("");
    setName("");
    setSex("");
    setAddModalActive(false);
  };

  const onClickEdit = async (event) => {
    const id = event.currentTarget.parentElement.parentElement.dataset.id;
    const data = await axios
      .get(`https://62f503b3535c0c50e767cf0c.mockapi.io/api/v1/tasks/${id}`)
      .then((response) => {
        return response.data;
      });
    setCurrentDate(data.birthday);
    setCurrentSex(data.sex);
    setCurrentName(data.name);
    setCurrentJob(data.job);
    setEditModalActive(true);
  };

  React.useEffect(() => {
    axios
      .get("https://62f503b3535c0c50e767cf0c.mockapi.io/api/v1/tasks")
      .then((response) => setData(response.data));
  }, []);

  return (
    <div className="container">
      <MyAppBar />
      <div className="content">
        <Menu setModalActive={setAddModalActive} />
        <Table data={data} clickEdit={onClickEdit} />
      </div>

      {/* Модалка для добавления */}
      <Modal active={addModalActive} setActive={setAddModalActive}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={4}>
            <TextField
              required
              id="outlined-required"
              label="Name"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <DatePicker
              label="Выберите дату"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              required
              id="outlined-required"
              label="Job"
              placeholder="Job"
              value={job}
              onChange={(e) => {
                setJob(e.target.value);
              }}
            />
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Sex"
              placeholder="Sex"
              value={sex}
              onChange={(e) => {
                setSex(e.target.value);
              }}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
            <Button onClick={onClickAdd} variant="contained">
              Добавить
            </Button>
          </Stack>
        </LocalizationProvider>
      </Modal>

      {/* Модалка для редактирования */}
      <Modal active={editModalActive} setActive={setEditModalActive}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={4}>
            <TextField
              required
              id="outlined-required"
              label="Name"
              placeholder="Name"
              value={currentName}
              onChange={(e) => {
                setCurrentName(e.target.value);
              }}
            />
            <DatePicker
              label="Выберите дату"
              value={currentDate}
              onChange={(newValue) => {
                setCurrentDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              required
              id="outlined-required"
              label="Job"
              placeholder="Job"
              value={currentJob}
              onChange={(e) => {
                setCurrentJob(e.target.value);
              }}
            />
            <Select
              required
              label="Sex"
              placeholder="Sex"
              value={currentSex}
              onChange={(e) => {
                setCurrentSex(e.target.value);
              }}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
            <Button variant="contained">Редактировать</Button>
          </Stack>
        </LocalizationProvider>
      </Modal>
    </div>
  );
}

export default App;
