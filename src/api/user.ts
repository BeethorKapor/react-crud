import { useState, useEffect } from 'react';
import axios from 'axios';
import { userModel } from '../utils/userModel';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const useUsers = () => {
  const [users, setUsers] = useState<userModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };
  const fetchUserById = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data; // Return the user data
    } catch (err) {
      setError(err.message || 'Error fetching user');
      return null; // Return null if there was an error
    }
  };

  const createUser = async (userData: userModel) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, userData);
      console.log("Add User Successfully", response.data);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setError(null);
    } catch (err) {
      setError('Error creating user');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: number, userData: userModel) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData);
      console.log("Update User Successfully", response.data);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? response.data : user))
      );
      setError(null);
    } catch (err) {
      setError('Error updating user');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setError(null);
    } catch (err) {
      setError('Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
  };
};