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

const AlbumSection = () => {
  const [albums, setAlbums] = useState([]);
  const [openAddAlbumModal, setOpenAddAlbumModal] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [openEditAlbumModal, setOpenEditAlbumModal] = useState(false);
  const [editedAlbumTitle, setEditedAlbumTitle] = useState("");
  const [openViewPhotosModal, setOpenViewPhotosModal] = useState(false);
  const [albumPhotos, setAlbumPhotos] = useState([]);

  const [openEditPhotoModal, setOpenEditPhotoModal] = useState(false);
  const [openDeletePhotoModal, setOpenDeletePhotoModal] = useState(false);
  const [editedPhoto, setEditedPhoto] = useState({});
  const [editedPhotoTitle, setEditedPhotoTitle] = useState("");

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("Error fetching albums", error);
      });
  }, []);

  const handleAddAlbum = () => {
    setOpenAddAlbumModal(true);
  };

  const handleSaveNewAlbum = () => {
    const newAlbum = {
      userId: 1,
      id: albums.length + 1,
      title: newAlbumTitle,
    };

    setAlbums([...albums, newAlbum]);
    setOpenAddAlbumModal(false);
    setNewAlbumTitle("");
  };

  const handleCloseAddAlbum = () => {
    setOpenAddAlbumModal(false);
  };

  const handleEditAlbum = (album) => {
    setSelectedAlbum(album);
    setEditedAlbumTitle(album.title);
    setOpenEditAlbumModal(true);
  };

  const handleSaveEditedAlbum = () => {
    const updatedAlbums = albums.map((album) =>
      album.id === selectedAlbum.id
        ? { ...album, title: editedAlbumTitle }
        : album
    );

    setAlbums(updatedAlbums);
    setOpenEditAlbumModal(false);
    setEditedAlbumTitle("");
  };

  const handleCloseEditAlbum = () => {
    setOpenEditAlbumModal(false);
  };

  const handleDeleteAlbumConfirmation = (album) => {
    setSelectedAlbum(album);
    setOpenDeleteModal(true);
  };

  const handleDeleteAlbum = () => {
    if (selectedAlbum) {
      const updatedAlbums = albums.filter((a) => a.id !== selectedAlbum.id);
      setAlbums(updatedAlbums);
    }

    setOpenDeleteModal(false);
    setSelectedAlbum(null);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedAlbum(null);
  };

  const handleViewPhotos = (album) => {
    setSelectedAlbum(album);
    axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`)
      .then((response) => {
        setAlbumPhotos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching photos", error);
      });
    setOpenViewPhotosModal(true);
  };

  const handleCloseViewPhotos = () => {
    setOpenViewPhotosModal(false);
    setAlbumPhotos([]);
  };

  const handleEditPhoto = (photo) => {
    setEditedPhoto(photo);
    setEditedPhotoTitle(photo.title);
    setOpenEditPhotoModal(true);
  };

  const handleCloseEditPhotoModal = () => {
    setOpenEditPhotoModal(false);
  };

  const handleSaveEditedPhoto = () => {
    console.log("Saving edited photo:", editedPhoto);
    handleCloseEditPhotoModal();
  };

  const handleDeletePhoto = (photo) => {
    setEditedPhoto(photo);
    setOpenDeletePhotoModal(true);
  };

  const handleCloseDeletePhotoModal = () => {
    setOpenDeletePhotoModal(false);
  };

  const handleConfirmDeletePhoto = () => {
    console.log("Deleting photo:", editedPhoto);

    const updatedPhotos = albumPhotos.filter(
      (photo) => photo.id !== editedPhoto.id
    );
    setAlbumPhotos(updatedPhotos);

    handleCloseDeletePhotoModal();
  };
  return (
    <div>
      <Typography
        variant="h2"
        sx={{ color: "white", fontSize: "40px", padding: "10px" }}
      >
        Album Section
      </Typography>
      <Button variant="contained" onClick={handleAddAlbum}>
        Add Album
      </Button>
      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid item xs={12} sm={6} md={4} key={album.id}>
            <Card
              sx={{
                minWidth: 275,
                margin: "10px",
                backgroundImage: `url('https://wallpapercave.com/wp/wp6956763.jpg')`,
                backgroundSize: "cover",
              }}
            >
              <CardContent>
                <Typography variant="h6">Title: {album.title}</Typography>
                <Typography variant="body1">Album ID: {album.id}</Typography>

                <Button
                  variant="outlined"
                  onClick={() => handleEditAlbum(album)}
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
                  onClick={() => handleDeleteAlbumConfirmation(album)}
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
                  onClick={() => handleViewPhotos(album)}
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
                  View Photos
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openAddAlbumModal} onClose={handleCloseAddAlbum}>
        <DialogTitle>Add New Album</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={newAlbumTitle}
            onChange={(e) => setNewAlbumTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddAlbum}>Cancel</Button>
          <Button onClick={handleSaveNewAlbum}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditAlbumModal} onClose={handleCloseEditAlbum}>
        <DialogTitle>Edit Album</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={editedAlbumTitle}
            onChange={(e) => setEditedAlbumTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditAlbum}>Cancel</Button>
          <Button onClick={handleSaveEditedAlbum}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openViewPhotosModal} onClose={handleCloseViewPhotos}>
        <DialogTitle>View Photos - Album ID: {selectedAlbum?.id}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {albumPhotos.map((photo) => (
              <Grid item xs={12} sm={6} md={4} key={photo.id}>
                <Card>
                  <CardContent>
                    <img
                      src={photo.thumbnailUrl}
                      alt={`Photo ${photo.id}`}
                      style={{ maxWidth: "100%", height: "auto" }}
                    />

                    <Typography variant="caption">{photo.title}</Typography>

                    <Button
                      onClick={() => handleEditPhoto(photo)}
                      variant="outlined"
                      sx={{
                        margin: "4px",
                        "&:hover": {
                          background: "green",
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeletePhoto(photo)}
                      variant="outlined"
                      sx={{
                        margin: "4px",
                        "&:hover": {
                          background: "red",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewPhotos}>Close</Button>
        </DialogActions>

        <Dialog open={openEditPhotoModal} onClose={handleCloseEditPhotoModal}>
          <DialogTitle>Edit Photo</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={editedPhotoTitle}
              onChange={(e) => setEditedPhotoTitle(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditPhotoModal}>Cancel</Button>
            <Button onClick={handleSaveEditedPhoto}>Save</Button>
          </DialogActions>
        </Dialog>
        {/* Delete Photo Modal */}
        <Dialog
          open={openDeletePhotoModal}
          onClose={handleCloseDeletePhotoModal}
        >
          <DialogTitle>Delete Photo</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this photo?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeletePhotoModal}>Cancel</Button>
            <Button onClick={handleConfirmDeletePhoto}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Dialog>

      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Delete Album</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the album "{selectedAlbum?.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={handleDeleteAlbum} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlbumSection;
