import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
// MUI
import { Box, useMediaQuery, Typography, useTheme } from '@mui/material'
// components
import Navbar from '../../components/Navbar'
import UserWidget from 'components/widgets/UserWidget'
import MyPostWidget from 'components/widgets/MyPostWidget'
import PostsWidget from 'components/widgets/PostsWidget'
import AdvertWidget from 'components/widgets/AdvertWidget'
import FriendListWidget from 'components/widgets/FriendListWidget'
import FlexBetween from 'components/FlexBetween'



const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const currentUser = useSelector((state) => state.user);
  const redux_user = useSelector((state) => state.user)
  const [isFeed, setIsFeed] = useState(true);
  const navigate = useNavigate();

  const { palette } = useTheme();
  const borderHighlight = palette.primary.main
  const dark = palette.neutral.dark;
  const mediumMain = palette.neutral.mediumMain;

  if (!currentUser) {
    navigate('/')
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget 
          userId={currentUser._id} 
          picturePath={currentUser.picturePath} 
          />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {currentUser && <MyPostWidget picturePath={currentUser.picturePath} />}
          <Box sx={{justifyContent: 'space-around !important', display: "flex", alignItems: "center"}}>
            <Typography 
            sx={
              {cursor: "pointer", 
              borderBottom: !isFeed && `2px solid ${borderHighlight}`, 
              padding: '10px 0',
              transition: '0.2s',
              color: `${isFeed ? mediumMain : dark} !important`,
              '&:hover': {
                borderBottom: `2px solid ${borderHighlight}`,
                color: `${dark} !important`,
              }
            }} 
            variant="h4" 
            onClick={() => setIsFeed(false)}
            >Friends</Typography>
            <Typography 
            sx={
              {cursor: "pointer", 
              borderBottom: isFeed && `2px solid ${borderHighlight}`, 
              padding: isFeed && '10px 0',
              color: `${!isFeed ? mediumMain : dark} !important`,
              transition: '0.2s',
              '&:hover': {
                borderBottom: `2px solid ${borderHighlight}`,
                color: `${dark} !important`,
              }
            }} 
            variant="h4" 
            onClick={() => setIsFeed(true)}
            >For you</Typography>
          </Box>
          <PostsWidget userId={currentUser._id} isFeed={isFeed} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={currentUser._id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage