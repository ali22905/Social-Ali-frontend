import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // for setting themes
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    // save the logged user data globally
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    // logout the user globally
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    // set the friends of the current user
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },

    // make the feed of the user
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    // update a post in the posts array
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;