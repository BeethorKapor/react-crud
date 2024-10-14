import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../api/user";
import { Pencil, Trash } from "lucide-react";
import ComfirmPopup from "../components/ComfirmPopup";
import { useState } from "react";

export const UserList = () => {
  const { users, loading, error, deleteUser } = useUsers();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

  const handleDelete = () => {
    if (userIdToDelete !== null) {
      deleteUser(userIdToDelete);
      setUserIdToDelete(null);
    }
    setIsPopupOpen(false);
  };
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Users List</h1>
        <Link
          to="/user/add"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Add User
        </Link>
      </div>
      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {!loading && !error && (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-base text-gray-700 bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className=" py-3">
                Name
              </th>
              <th scope="col" className=" py-3">
                User Name
              </th>
              <th scope="col" className=" py-3">
                Email
              </th>
              <th scope="col" className=" py-3">
                Phone
              </th>
              <th scope="col" className=" py-3 flex justify-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b"
                onClick={() => navigate(`/user/detail/${user.id}`)}
              >
                <th
                  scope="row"
                  className=" py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {user.name}
                </th>
                <td className=" py-3">{user.username}</td>
                <td className=" py-3">{user.email}</td>
                <td className=" py-3">{user.phone}</td>
                <td>
                  <div className="flex justify-center items-center gap-4">
                    <Link
                      to={`/user/edit/${user.id}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Pencil className="w-5 h-5 text-blue-500  hover:fill-current" />
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserIdToDelete(user.id);
                        setIsPopupOpen(true);
                      }}
                      className="ml-2 text-red-500"
                    >
                      <Trash className="w-5 h-5 text-[#ff0e0e] hover:fill-current" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ComfirmPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
};
export default UserList;
