import React, { useEffect, useState } from 'react';
import classes from './Users.module.css'
import NavBar from './NavBar';

function UserListingPage() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const userApiUrl = 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users';

  const fetchUsers = () => {
    fetch(userApiUrl)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const displayUsers = (usersToDisplay) => {
    return usersToDisplay.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>
          <img src={user.profilePic} alt="Profile Pic" width="50" height="50" />
        </td>
        <td>{user.fullName}</td>
        <td>{user.dob}</td>
        <td>{user.gender}</td>
        <td>{user.currentCity}</td>
        <td>{user.currentCountry}</td>
      </tr>
    ));
  };

  const searchUsers = () => {
    const trimmedSearchQuery = searchQuery.trim();

    if (trimmedSearchQuery.length < 2) {
      alert('Please enter at least 2 characters for search.');
      return;
    }

    const searchUrl = `${userApiUrl}?fullName=${trimmedSearchQuery}`;

    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.error('Error searching users:', error);
      });
  };

  const resetSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className={classes.container}>
            <NavBar/>

      <h1 className={classes.heading}>Users</h1>
      <div className={classes.search}>
        <input
          type="text"
          id="searchInput"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={classes.buttons} onClick={searchUsers}>
          Search
        </button>
        <button className={classes.buttons} onClick={resetSearch}>
          Reset
        </button>
      </div>
      {searchQuery.length < 2 && (
        <div className={classes.alert}>Please enter at least 2 characters</div>
      )}
      <table className={classes.user_table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile Pic</th>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Current City</th>
            <th>Current Country</th>
          </tr>
        </thead>
        <tbody id="userTableBody">
          {searchQuery.length < 2
            ? displayUsers(users)
            : displayUsers(searchResults)}
        </tbody>
      </table>
    </div>
  );
}

export default UserListingPage;
