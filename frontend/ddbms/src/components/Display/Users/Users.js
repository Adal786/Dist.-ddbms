import React, { useEffect, useState } from 'react';
import userservices from '../../services/userservices'; // Import the service

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userservices.get()
            .then(response => {
                setUsers(response); // Set users data
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Name</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Email</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td style={{ border: '1px solid black', padding: '10px' }}>{user.name}</td>
                            <td style={{ border: '1px solid black', padding: '10px' }}>{user.email}</td>
                            <td style={{ border: '1px solid black', padding: '10px' }}>{user.admin ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
