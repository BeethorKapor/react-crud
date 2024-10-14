import { Link, useParams } from "react-router-dom";
import { useUsers } from "../../api/user";
import { useState, useEffect } from "react";
import { userModel } from "../../utils/userModel";

export const DetailUser = () => {
  const { id } = useParams();
  const { fetchUserById, loading, error, users } = useUsers();
  const [user, setUser] = useState<userModel | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const fetchedUser = await fetchUserById(Number(id));
      setUser(fetchedUser);
    };

    const cachedUser = users.find((u) => u.id === Number(id));
    if (cachedUser) {
      setUser(cachedUser);
    } else {
      getUserDetails();
    }
  }, [id, fetchUserById, users]);

  return user ? (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mb-4">User Details</h1>
        <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded">
          Back
        </Link>
      </div>
      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {!loading && !error && (
        <div>
          <p>
            Name: <span className="font-bold">{user.name}</span>
          </p>
          <p>
            User Name: <span className="font-bold">{user.username}</span>
          </p>
          <p>
            Email: <span className="font-bold">{user.email}</span>
          </p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <div>
            <h2 className="font-semibold">Address:</h2>
            <div className="pl-8">
              <p>Street: {user.address.street}</p>
              <p>Suite: {user.address.suite}</p>
              <p>City: {user.address.city}</p>
              <p>Zipcode: {user.address.zipcode}</p>
              <h2 className="font-semibold">Geo:</h2>
              <div className="pl-8">
                <p>Lat: {user.address.geo.lat}</p>
                <p>Lng: {user.address.geo.lng}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-semibold">Company:</h2>
            <div className="pl-8">
              <p>Name: {user.company.name}</p>
              <p>CatchPhrase: {user.company.catchPhrase}</p>
              <p>BS: {user.company.bs}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>User not found</div>
  );
};
export default DetailUser;
