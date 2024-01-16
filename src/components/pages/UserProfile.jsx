import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
  CardMedia,
} from "@mui/material";

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedName, setEditedName] = useState(userData.name || "");
  const [editedEmail, setEditedEmail] = useState(userData.email || "");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [userPosts, setUserPosts] = useState([]);
  const [userAlbums, setUserAlbums] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [editedPostTitle, setEditedPostTitle] = useState("");
  const [editedPostBody, setEditedPostBody] = useState("");
  const [openEditPostDialog, setOpenEditPostDialog] = useState(false);
  const [openDeletePostDialog, setOpenDeletePostDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);

  const [postComments, setPostComments] = useState([]);

  const [openEditAlbum, setOpenEditAlbum] = useState(false);
  const [editedAlbumTitle, setEditedAlbumTitle] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [openViewPhotos, setOpenViewPhotos] = useState(false);
  const [openDeleteAlbumDialog, setOpenDeleteAlbumDialog] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [openViewPhotosModal, setOpenViewPhotosModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumPhotos, setAlbumPhotos] = useState([]);

  const handleEditUser = () => {
    setOpenEditDialog(true);
  };

  const handleDeleteUser = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    console.log(`User with ID ${userId} deleted`);

    setOpenDeleteDialog(false);
  };

  const handleSaveEdit = () => {
    setUserData({
      ...userData,
      name: editedName,
      email: editedEmail,
    });

    setOpenEditDialog(false);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setEditedPostTitle(post.title);
    setEditedPostBody(post.body);
    setOpenEditPostDialog(true);
  };

  const handleDeletePost = (postId) => {
    setOpenDeletePostDialog(true);
    setPostToDelete(postId);
  };

  const handleConfirmDeletePost = () => {
    setOpenDeletePostDialog(false);

    const updatedPosts = userPosts.filter((post) => post.id !== postToDelete);
    setUserPosts(updatedPosts);

    setPostToDelete(null);
  };

  const handleSaveEditPost = () => {
    const updatedPosts = userPosts.map((post) => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          title: editedPostTitle,
          body: editedPostBody,
        };
      }
      return post;
    });

    setUserPosts(updatedPosts);

    setOpenEditPostDialog(false);

    console.log("Edited Post Data:", {
      postId: selectedPost.id,
      title: editedPostTitle,
      body: editedPostBody,
    });
  };

  const handleCloseEditPostDialog = () => {
    setOpenEditPostDialog(false);
  };

  const handleCloseDeletePostDialog = () => {
    setOpenDeletePostDialog(false);
    setPostToDelete(null);
  };

  const getRandomDate = () => {
    const randomDate = new Date(
      new Date() - Math.floor(Math.random() * 100) * 60 * 1000
    ).toLocaleString();
    return `Posted on: ${randomDate}`;
  };

  const handleViewComments = (postId) => {
    setSelectedPost(postId);
    setOpenCommentsModal(true);

    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((response) => {
        setPostComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post comments", error);
      });
  };
  const handleCloseCommentsModal = () => {
    setOpenCommentsModal(false);
    setSelectedPost(null);
    setPostComments([]);
  };

  const handleEditAlbum = (albumId) => {
    const selectedAlbum = userAlbums.find((album) => album.id === albumId);
    setEditedAlbumTitle(selectedAlbum.title);
    setSelectedAlbumId(albumId);
    setOpenEditAlbum(true);
  };

  const handleDeleteAlbum = (albumId) => {
    setOpenDeleteAlbumDialog(true);
    setAlbumToDelete(albumId);
  };
  const handleCloseDeleteAlbumDialog = () => {
    setOpenDeleteAlbumDialog(false);
    setAlbumToDelete(null);
  };

  const confirmDeleteAlbum = () => {
    setOpenDeleteAlbumDialog(false);

    const updatedAlbums = userAlbums.filter(
      (album) => album.id !== albumToDelete
    );
    setUserAlbums(updatedAlbums);

    setAlbumToDelete(null);
  };

  const handleViewPhotos = (albumId) => {
    setSelectedAlbum(albumId);
    setOpenViewPhotosModal(true);

    axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then((response) => {
        setAlbumPhotos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching album photos", error);
      });
  };

  const handleCloseViewPhotosModal = () => {
    setOpenViewPhotosModal(false);
    setSelectedAlbum(null);
    setAlbumPhotos([]);
  };

  const handleCloseEditAlbum = () => {
    setOpenEditAlbum(false);
  };

  const handleSaveEditAlbum = () => {
    const updatedAlbums = userAlbums.map((album) => {
      if (album.id === selectedAlbumId) {
        return { ...album, title: editedAlbumTitle };
      }
      return album;
    });
    setUserAlbums(updatedAlbums);
    setOpenEditAlbum(false);
  };

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });

    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        setUserPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user posts", error);
      });

    axios
      .get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then((response) => {
        setUserAlbums(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user albums", error);
      });
  }, [userId]);

  return (
    <div>
      <Typography
        variant="h2"
        sx={{
          color: "white",
          fontSize: "40px",
        }}
      >
        User Profile
      </Typography>

      <Card>
        <CardContent
          sx={{
            background: `url('https://wallpapercave.com/wp/wp6956763.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            margin: "5px",
          }}
        >
          <Typography variant="h5">User Details</Typography>
          <Typography>User ID: {userData.id}</Typography>
          <Typography>Name: {userData.name}</Typography>
          <Typography>Email: {userData.email}</Typography>

          <Button
            variant="outlined"
            onClick={() => handleEditUser()}
            sx={{
              background:
                "linear-gradient(90deg, rgba(2,0,36,1) 11%, rgba(0,0,149,1) 100%, rgba(0,212,255,1) 100%)",
              color: "white",
              borderRadius: "5px",
              margin: "4px",
              "&:hover": {
                background: "Green",
              },
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleDeleteUser()}
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
        </CardContent>
      </Card>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
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
            label="Email"
            variant="outlined"
            fullWidth
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Close</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            variant="outlined"
            sx={{ color: "red" }}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Card>
        <CardContent>
          <Typography variant="h5">User Posts</Typography>

          {userPosts.map((post) => (
            <Card key={post.id} sx={{ marginBottom: 2 }}>
              <CardContent
                sx={{
                  backgroundImage: `url('https://wallpapercave.com/wp/wp6956763.jpg')`,
                  backgroundSize: "cover",
                  color: "black",
                  padding: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">{post.title}</Typography>
                <Typography>{post.body}</Typography>
                <Typography variant="caption" fontWeight={700} marginBottom={5}>
                  {getRandomDate()}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleEditPost(post)}
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(2,0,36,1) 11%, rgba(0,0,149,1) 100%, rgba(0,212,255,1) 100%)",
                    color: "white",
                    borderRadius: "5px",
                    margin: "8px",
                    marginTop: "73px",

                    "&:hover": {
                      background: "Green",
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleDeletePost(post.id)}
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(2,0,36,1) 11%, rgba(0,0,149,1) 100%, rgba(0,212,255,1) 100%)",
                    color: "white",
                    borderRadius: "5px",
                    margin: "4px",
                    marginTop: "70px",

                    "&:hover": {
                      background: "Red",
                    },
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleViewComments(post.id)}
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(2,0,36,1) 11%, rgba(0,0,149,1) 100%, rgba(0,212,255,1) 100%)",
                    color: "white",
                    borderRadius: "5px",
                    margin: "4px",
                    marginTop: "70px",
                    "&:hover": {
                      background: "Blue",
                    },
                  }}
                >
                  View Comments
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
      <Dialog open={openEditPostDialog} onClose={handleCloseEditPostDialog}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={editedPostTitle}
            onChange={(e) => setEditedPostTitle(e.target.value)}
          />
          <TextField
            label="Body"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={editedPostBody}
            onChange={(e) => setEditedPostBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditPostDialog}>Close</Button>
          <Button onClick={handleSaveEditPost}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeletePostDialog} onClose={handleCloseDeletePostDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeletePostDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmDeletePost}
            variant="outlined"
            sx={{ color: "red" }}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openCommentsModal} onClose={handleCloseCommentsModal}>
        <DialogTitle>Post Comments</DialogTitle>
        <DialogContent>
          <ul>
            {postComments.map((comment) => (
              <Card key={comment.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1">{comment.name}</Typography>
                  <Typography>{comment.body}</Typography>
                  <Typography variant="caption">{comment.email}</Typography>
                </CardContent>
              </Card>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCommentsModal}>Close</Button>
        </DialogActions>
      </Dialog>

      <Card>
        <CardContent>
          <Typography variant="h5">User Albums</Typography>
          {userAlbums.map((album) => (
            <Card key={album.id} sx={{ marginBottom: 2 }}>
              <CardContent
                sx={{
                  backgroundImage: `url('https://wallpapercave.com/wp/wp6956763.jpg')`,
                  backgroundSize: "cover",
                  color: "black",
                  padding: "10px",
                }}
              >
                <Typography variant="h6">Id : {album.id}</Typography>
                <Typography variant="h6">Title : {album.title}</Typography>

                <Button
                  variant="outlined"
                  onClick={() => handleEditAlbum(album.id)}
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(2,0,36,1) 11%, rgba(0,0,149,1) 100%, rgba(0,212,255,1) 100%)",
                    color: "white",
                    borderRadius: "5px",
                    margin: "4px",
                    "&:hover": {
                      background: "Green",
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteAlbum(album.id)}
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
                <Button
                  variant="outlined"
                  onClick={() => handleViewPhotos(album.id)}
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(2,0,36,1) 11%, rgba(0,0,149,1) 100%, rgba(0,212,255,1) 100%)",
                    color: "white",
                    borderRadius: "5px",
                    margin: "4px",
                    "&:hover": {
                      background: "Blue",
                    },
                  }}
                >
                  View Photos
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Dialog open={openEditAlbum} onClose={handleCloseEditAlbum}>
        <DialogTitle>Edit Album</DialogTitle>
        <DialogContent>
          <TextField
            label="Album Title"
            variant="outlined"
            fullWidth
            value={editedAlbumTitle}
            onChange={(e) => setEditedAlbumTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditAlbum}>Cancel</Button>
          <Button onClick={handleSaveEditAlbum}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteAlbumDialog}
        onClose={handleCloseDeleteAlbumDialog}
      >
        <DialogTitle>Delete Album</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this album?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteAlbumDialog}>Cancel</Button>
          <Button
            onClick={confirmDeleteAlbum}
            variant="outlined"
            sx={{ color: "red" }}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openViewPhotosModal} onClose={handleCloseViewPhotosModal}>
        <DialogTitle>View Photos</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {albumPhotos.map((photo) => (
              <Card key={photo.id} sx={{ width: 200, margin: 1 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={photo.thumbnailUrl}
                  alt={photo.title}
                />
                <CardContent>
                  <Typography variant="caption">{photo.title}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewPhotosModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfile;
