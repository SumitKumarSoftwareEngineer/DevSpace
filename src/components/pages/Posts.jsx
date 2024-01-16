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

const PostSection = () => {
  const [posts, setPosts] = useState([]);
  const [openAddPost, setOpenAddPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [selectedPost, setSelectedPost] = useState({});
  const [openEditPost, setOpenEditPost] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [editedComment, setEditedComment] = useState({});
  const [openEditComment, setOpenEditComment] = useState(false);
  const [openDeleteCommentModal, setOpenDeleteCommentModal] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts", error);
      });
  }, []);

  const handleAddPost = () => {
    setOpenAddPost(true);
  };

  const handleSavePost = () => {
    const newPost = {
      userId: 1,
      id: posts.length + 1,
      title: newPostTitle,
      body: newPostBody,
    };

    setPosts([...posts, newPost]);

    axios
      .post("https://jsonplaceholder.typicode.com/posts", newPost)
      .then((response) => {
        console.log("New post added:", response.data);
      })
      .catch((error) => {
        console.error("Error adding new post", error);
      });

    setOpenAddPost(false);
    setNewPostTitle("");
    setNewPostBody("");
  };

  const handleCloseAddPost = () => {
    setOpenAddPost(false);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setOpenEditPost(true);
    setNewPostTitle(post.title);
    setNewPostBody(post.body);
  };

  const handleSaveEditedPost = () => {
    const updatedPosts = posts.map((post) =>
      post.id === selectedPost.id
        ? { ...post, title: newPostTitle, body: newPostBody }
        : post
    );

    setPosts(updatedPosts);
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${selectedPost.id}`, {
        title: newPostTitle,
        body: newPostBody,
      })
      .then((response) => {
        console.log("Post updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating post", error);
      });

    setOpenEditPost(false);
    setNewPostTitle("");
    setNewPostBody("");
  };

  const handleCloseEditPost = () => {
    setOpenEditPost(false);
  };

  const handleDeletePost = (post) => {
    const updatedPosts = posts.filter((p) => p.id !== post.id);
    setPosts(updatedPosts);

    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
      .then((response) => {
        console.log("Post deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting post", error);
      });
  };

  const handleDeleteConfirmationOpen = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleDeleteConfirmationClose = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleConfirmDeletePost = () => {
    handleDeletePost(selectedPost);

    handleDeleteConfirmationClose();
  };

  const handleViewComments = (post) => {
    setSelectedPost(post);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments", error);
      });
    setOpenComments(true);
  };

  const handleCloseComments = () => {
    setOpenComments(false);
    setComments([]);
  };

  const getRandomDate = () => {
    const randomDate = new Date(
      new Date() - Math.floor(Math.random() * 100) * 60 * 1000
    ).toLocaleString();
    return `Posted on: ${randomDate}`;
  };

  const handleEditComment = (comment) => {
    setEditedComment(comment);
    setOpenEditComment(true);
  };

  const handleSaveEditedComment = () => {
    const updatedComments = comments.map((comment) =>
      comment.id === editedComment.id
        ? { ...comment, ...editedComment }
        : comment
    );

    setComments(updatedComments);

    axios
      .put(
        `https://jsonplaceholder.typicode.com/comments/${editedComment.id}`,
        editedComment
      )
      .then((response) => {
        console.log("Comment updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating comment", error);
      });

    setOpenEditComment(false);
    setEditedComment({});
  };

  const handleCloseEditComment = () => {
    setOpenEditComment(false);
    setEditedComment({});
  };

  const handleDeleteComment = (comment) => {
    setEditedComment(comment);
    setOpenDeleteCommentModal(true);
  };

  const handleConfirmDeleteComment = () => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== editedComment.id
    );

    setComments(updatedComments);

    axios
      .delete(
        `https://jsonplaceholder.typicode.com/comments/${editedComment.id}`
      )
      .then((response) => {
        console.log("Comment deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting comment", error);
      });

    setOpenDeleteCommentModal(false);
    setEditedComment({});
  };

  const handleCloseDeleteCommentModal = () => {
    setOpenDeleteCommentModal(false);
    setEditedComment({});
  };

  return (
    <div>
      <Typography
        variant="h2"
        sx={{ color: "white", fontSize: "40px", padding: "10px" }}
      >
        Post Section
      </Typography>
      <Button variant="contained" onClick={handleAddPost}>
        Add Post
      </Button>

      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              sx={{
                minWidth: 275,
                margin: "10px",
                backgroundImage: `url('https://wallpapercave.com/wp/wp6956763.jpg')`,
                backgroundSize: "cover",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={700} margin={1}>
                  {post.title}
                </Typography>
                <Typography variant="body2">{post.body}</Typography>
                <Typography variant="caption" fontWeight={700} marginBottom={7}>
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
                    margin: "4px",
                    marginTop: "100px",
                    position: "relative",
                    right: "30px",

                    "&:hover": {
                      background: "green",
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteConfirmationOpen(post)}
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(2,0,36,1) 11%, rgba(0,0,149,1) 100%, rgba(0,212,255,1) 100%)",
                    color: "white",
                    borderRadius: "5px",
                    margin: "4px",
                    marginTop: "100px",
                    position: "relative",
                    right: "30px",

                    "&:hover": {
                      background: "Red",
                    },
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleViewComments(post)}
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(2,0,36,1) 11%, rgba(0,0,149,1) 100%, rgba(0,212,255,1) 100%)",
                    color: "white",
                    borderRadius: "5px",
                    margin: "4px",

                    position: "relative",
                    right: "100px",
                    bottom: "44px",

                    "&:hover": {
                      background: "blue",
                    },
                  }}
                >
                  View Comments
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openAddPost} onClose={handleCloseAddPost}>
        <DialogTitle>Add New Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <TextField
            label="Body"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}
            style={{ marginTop: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddPost}>Cancel</Button>
          <Button onClick={handleSavePost}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditPost} onClose={handleCloseEditPost}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <TextField
            label="Body"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}
            style={{ marginTop: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditPost}>Cancel</Button>
          <Button onClick={handleSaveEditedPost}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openComments} onClose={handleCloseComments}>
        <DialogTitle fontWeight={700}>Comments</DialogTitle>
        <DialogContent>
          <Card sx={{ marginBottom: 2 }}>
            <CardContent>
              {comments.map((comment) => (
                <div key={comment.id}>
                  <Typography variant="body2">{comment.name}</Typography>
                  <Typography variant="body2">{comment.body}</Typography>
                  <Typography variant="caption">{comment.email}</Typography>

                  <Button
                    onClick={() => handleEditComment(comment)}
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
                    onClick={() => handleDeleteComment(comment)}
                    variant="outlined"
                    sx={{
                      margin: "4px",
                      "&:hover": {
                        background: "Red",
                      },
                    }}
                  >
                    Delete
                  </Button>

                  <hr />
                </div>
              ))}
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseComments}>Close</Button>
        </DialogActions>

        <Dialog open={openEditComment} onClose={handleCloseEditComment}>
          <DialogTitle>Edit Comment</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={editedComment.name}
              onChange={(e) =>
                setEditedComment({ ...editedComment, name: e.target.value })
              }
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={editedComment.email}
              onChange={(e) =>
                setEditedComment({ ...editedComment, email: e.target.value })
              }
              style={{ marginTop: "10px" }}
            />
            <TextField
              label="Body"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={editedComment.body}
              onChange={(e) =>
                setEditedComment({ ...editedComment, body: e.target.value })
              }
              style={{ marginTop: "10px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditComment}>Cancel</Button>
            <Button onClick={handleSaveEditedComment}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openDeleteCommentModal}
          onClose={handleCloseDeleteCommentModal}
        >
          <DialogTitle>Delete Comment</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDeleteCommentModal}>Cancel</Button>
            <Button onClick={handleConfirmDeleteComment}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Dialog>

      <Dialog
        open={openDeleteConfirmation}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
          <Button onClick={handleConfirmDeletePost} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostSection;
