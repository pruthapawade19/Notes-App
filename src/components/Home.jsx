import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

//components
import SwipeDrawer from "./SwipeDrawer";
import Notes from "./notes/Notes";
import Archives from "./archives/Archives";
import DeleteNotes from "./delete/DeleteNotes";
import UploadFiles from "./upload/UploadFiles";
import Login from "./login/Login";
import Register from "./login/Register"

const Home = () => {
  return (
    <Box style={{ display: "flex", width: "100%" }}>
      <Router>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register/>} />

          <Route path="/notes" element={<><SwipeDrawer /> <Notes /></>} />
          <Route path="/archive" element={<><SwipeDrawer /> <Archives /></>} />
          <Route path="/delete" element={<><SwipeDrawer /> <DeleteNotes /></>} />
          <Route path="/upload" element={<><SwipeDrawer /> <UploadFiles /></>} />
        </Routes>
      </Router>
    </Box>
  );
};

export default Home;
