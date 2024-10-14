import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import DetailUser from "./pages/user/DetailUser";
import UserList from "./pages/UserList";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/add" element={<AddUser />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route path="/user/detail/:id" element={<DetailUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
