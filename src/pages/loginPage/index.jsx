import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from 'react-redux'
import Form from './Form'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();


  useEffect(() => {
    if (currentUser) {
      navigate('/home')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          SocialAli
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to SocialAli 👋&#128522;!  Here you can share images, moments, and thoughts with your friends.
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage