import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./pages/user/UserForm";
import DetailUser from "./pages/user/DetailUser";
import UserList from "./pages/UserList";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/add" element={<UserForm />} />
          <Route path="/user/edit/:id" element={<UserForm />} />
          <Route path="/user/detail/:id" element={<DetailUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
