# Social-Ali

## Description
Social-Ali is a frontend part of a social media app developed using the MERN stack. It allows users to share their thoughts, moments, and photos with friends and other people. This project aims to recreate the essence of a social media platform where users can connect and engage with each other.

## Technologies Used
- React
- Material-UI (MUI)
- Formik
- Redux
- JWT (JSON Web Tokens)
- Yup

## Motivation
I created this website because I've always been fascinated by social media platforms like Instagram since I was a child. I wanted to create something similar, and after extensive research and hard work, I finally accomplished it.

## Code Example
Here's an example code snippet from the app's functionality for creating a new post:

```javascript
const handlePost = async () => {
  const formData = new FormData();
  formData.append("userId", _id);
  formData.append("description", post);
  if (image) {
    formData.append("picture", image);
    formData.append("picturePath", image.name);
  }

  const response = await fetch(`https://social-ali-api.onrender.com/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const posts = await response.json();
  dispatch(setPosts({ posts }));
  setImage(null);
  setPost("");
};
```

## Contact Information
- Name: Ali Attia
- Email: aly2292005@gmail.com
- Phone Number: +201027393406