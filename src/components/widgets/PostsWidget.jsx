import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isFeed = true ,isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const currentUser = useSelector((state) => state.user);
  console.log(isFeed)


  // Start (if it's the profile page show the user's posts and if it is the home show the user's feed)

  const getPosts = async () => {
    const response = await fetch("https://social-ali-api.onrender.com/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://social-ali-api.onrender.com/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getFriendsPosts = async () => {
    const response = await fetch("https://social-ali-api.onrender.com/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    let new_posts = []
    data.forEach(post => {
      currentUser.friends.forEach((friend) => {
        if(friend._id === post.userId) {
          new_posts.push(post);
        }
      })
    });
    dispatch(setPosts({ posts: new_posts }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      if(isFeed) {
        getPosts();
      }else {
        getFriendsPosts();
        console.log("not is feed")
      }
    }
  }, [isFeed, isProfile]); // eslint-disable-line react-hooks/exhaustive-deps

  // End


  return (
    <>
      {posts.map(
        ({
          // get each post data from the DB
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
          // render the post widget with its information coming from the DB
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;