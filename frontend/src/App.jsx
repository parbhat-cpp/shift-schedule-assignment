import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const SERVER_URL = "http://localhost:5000";

const AppContainer = styled(Box)({
  width: "100%",
  height: "100vh",
});

const CustomButton = styled(Button)({
  textTransform: "none",
  background: "blue",
  color: "white",
  "&:hover": {
    background: "blue",
  },
});

function App() {
  const [shiftList, setShiftList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [runOnce, setRunOnce] = useState(false);
  const [newShift, setNewShift] = useState({
    shiftTitle: "",
    from: "",
    to: "",
  });

  const reloadPage = () => {
    window.location.reload(true);
  };

  useEffect(() => {
    if (runOnce === true) return;
    (async () => {
      await fetch(`${SERVER_URL}/api/get-shifts`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setShiftList(data);
        })
        .catch((err) => console.log(err));
    })();
    console.log(shiftList);
    setRunOnce(true);
  }, [runOnce, shiftList]);

  const saveNewShift = async () => {
    if (newShift.from && newShift.shiftTitle && newShift.to) {
      await fetch(`${SERVER_URL}/api/add-shift`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newShift),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      reloadPage();
      return;
    }
    alert("Enter all fields");
  };

  const removeShift = async (id) => {
    console.log(id);
    await fetch(`${SERVER_URL}/api/remove-shift`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    reloadPage();
    alert("Deleted shift with id: " + id);
  };

  return (
    <>
      <AppContainer>
        <AppBar position="static">
          <Toolbar>
            <Typography>Shift Schedule</Typography>
          </Toolbar>
        </AppBar>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Shift Title</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shiftList &&
                shiftList.map((shift) => (
                  <TableRow key={shift.id}>
                    <TableCell>{shift.id}</TableCell>
                    <TableCell>{shift.shiftTitle}</TableCell>
                    <TableCell>{shift.from}</TableCell>
                    <TableCell>{shift.to}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => removeShift(shift.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "15px",
          }}
        >
          <CustomButton onClick={() => setOpenDialog(true)}>
            Add new Shift
          </CustomButton>
        </Box>
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          PaperProps={{
            sx: {
              width: "50%",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              background: "#f4f4f4",
              display: "flex",
              "&>button": {
                margin: "0 0 0 auto",
              },
            }}
          >
            <IconButton onClick={() => setOpenDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              "&>div": {
                margin: "5px auto",
                width: "95%",
              },
              "&>button": {
                margin: "5px auto 7px auto",
                width: "95%",
              },
            }}
          >
            <TextField
              id="standard-basic"
              label="Shift Title"
              variant="standard"
              onChange={(e) =>
                setNewShift({ ...newShift, shiftTitle: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="From"
              variant="standard"
              onChange={(e) =>
                setNewShift({ ...newShift, from: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="To"
              variant="standard"
              onChange={(e) => setNewShift({ ...newShift, to: e.target.value })}
            />
            <CustomButton
              onClick={() => {
                saveNewShift();
                setOpenDialog(false);
              }}
            >
              Save
            </CustomButton>
          </Box>
        </Dialog>
      </AppContainer>
    </>
  );
}

export default App;
