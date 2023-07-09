import { Box } from "@mui/material";

// the profile picture
const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
      // crop the image to fit the space
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://social-ali-api.onrender.com/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;