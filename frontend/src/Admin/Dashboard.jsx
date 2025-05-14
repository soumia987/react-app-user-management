import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, verified: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, statsResponse] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/stats')
        ]);
        setUsers(usersResponse.data);
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Users</h3>
          <p className="text-2xl font-bold">{stats.active}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Verified Users</h3>
          <p className="text-2xl font-bold">{stats.verified}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-4 bg-gray-100">User Management</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user._id}>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}