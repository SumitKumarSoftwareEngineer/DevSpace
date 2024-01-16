import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";

const UserSection = () => {
  const [users, setUsers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [editedName, setEditedName] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserAddress, setNewUserAddress] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUserProfile, setOpenUserProfile] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
      });
  }, []);

  const handleDelete = (user) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const handleDeleteUser = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`)
      .then((response) => {
        console.log("User deleted:", response.data);
        const updatedUsers = users.filter(
          (user) => user.id !== selectedUser.id
        );
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error deleting user", error);
      });

    setOpenDeleteModal(false);
  };

  const handleVisitProfile = (userId) => {
    setSelectedUserId(userId);
  };

  const handleCloseUserProfile = () => {
    setSelectedUserId(null);
    setOpenUserProfile(false);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedName(user.name);

    setEditedAddress(user.address.street);
    setEditedAddress(user.address.suite);
    setEditedAddress(user.address.city);

    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
    setOpenAddUserModal(false);
    setOpenDeleteModal(false);
  };

  const handleSave = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          name: editedName,
          address: { ...user.address, street: editedAddress },
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setOpenEdit(false);
  };

  const handleAddUser = () => {
    setOpenAddUserModal(true);
  };

  const handleSaveNewUser = () => {
    const newUser = {
      id: users.length + 1,
      name: newUserName,
      address: {
        street: newUserAddress,
      },
    };

    setUsers([...users, newUser]);
    setOpenAddUserModal(false);
  };

  return (
    <div>
      <Typography
        variant="h2"
        sx={{ color: "white", fontSize: "40px", padding: "10px" }}
      >
        User Section
      </Typography>
      <Button variant="contained" onClick={handleAddUser}>
        Add User
      </Button>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card
              sx={{
                minWidth: 275,
                margin: "10px",
                backgroundImage: `url('https://wallpapercave.com/wp/wp6956763.jpg')`,
                backgroundSize: "cover",
              }}
            >
              <CardContent>
                <Typography variant="h6">Name: {user.name}</Typography>
                <Typography variant="h6">Email: {user.email}</Typography>
                <Typography variant="body1">User ID: {user.id}</Typography>
                <Typography variant="body2">
                  Address-Street: {user.address.street}
                </Typography>
                <Typography variant="body2">
                  Address-Suite: {user.address.suite}
                </Typography>
                <Typography variant="body2">
                  Address-City: {user.address.city}
                </Typography>

                <Button
                  variant="outlined"
                  onClick={() => handleEdit(user)}
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(2,0,36,1) 11%, rgba(0,0,149,1) 100%, rgba(0,212,255,1) 100%)",
                    color: "white",
                    borderRadius: "5px",
                    margin: "4px",
                    "&:hover": {
                      background: "green",
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleDelete(user)}
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(2,0,36,1) 11%, rgba(0,0,149,1) 100%, rgba(0,212,255,1) 100%)",
                    color: "white",
                    borderRadius: "5px",
                    margin: "4px",
                    "&:hover": {
                      background: "Red",
                    },
                  }}
                >
                  Delete
                </Button>
                <Link
                  to={`/user/${user.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleVisitProfile(user.id)}
                    sx={{
                      background:
                        "linear-gradient(90deg, rgba(2,0,36,1) 11%, rgba(0,0,149,1) 100%, rgba(0,212,255,1) 100%)",
                      color: "white",
                      borderRadius: "5px",
                      margin: "4px",
                      "&:hover": {
                        background: "blue",
                      },
                    }}
                  >
                    Visit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <TextField
            label="Address Street"
            variant="outlined"
            fullWidth
            value={editedAddress}
            onChange={(e) => setEditedAddress(e.target.value)}
          />
          <TextField
            label="Address Suite"
            variant="outlined"
            fullWidth
            value={editedAddress}
            onChange={(e) => setEditedAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddUserModal} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={newUserAddress}
            onChange={(e) => setNewUserAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveNewUser}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteModal} onClose={handleClose}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedUser.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteUser} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {selectedUserId && (
        <UserProfile userId={selectedUserId} onClose={handleCloseUserProfile} />
      )}
    </div>
  );
};

export default UserSection;
