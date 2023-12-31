import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// to make files uploads (drop a file)
// import Dropzone from "react-dropzone";
// import FlexBetween from "components/FlexBetween";


// validation of the form with yup
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};



const Form = () => {
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const default_bg = palette.background.default
  const main_color = palette.primary.main
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [avatar, setAvatar] = useState("avatar1.png");
  const [openChooseAvatar, setOpenChooseAvatar] = useState(false);

  const handleClose = () => {
    setOpenChooseAvatar(false);
  };


  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", avatar);



    const response = await fetch(
      "https://social-ali-api.onrender.com/auth/register", // API
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await response.json();
    console.log(savedUser)
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
      onSubmitProps.setFieldValue("email", savedUser.email)
    }
  };


  const login = async (values, onSubmitProps) => {
    const response = await fetch("https://social-ali-api.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await response.json();
    
    if (response.status === 200) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      onSubmitProps.resetForm();
      navigate("/home");
    }else {
      setIsSnackOpen(true)
    }
  };


  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };


  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackOpen(false);
  };



  const chooseAvatar = () => {
    setOpenChooseAvatar(true)
  }



  return (
    <>
      <Snackbar open={isSnackOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
          <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
            Wrong credintials! &#128542;
          </Alert>
      </Snackbar>
      <Dialog
        open={openChooseAvatar}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{backgroundColor: default_bg}} id="alert-dialog-title">
          <Typography variant="h4">Choose your avatar</Typography>
        </DialogTitle>
        <DialogContent sx={{backgroundColor: default_bg}}>
          <Typography vareint="h5">
            MEN
          </Typography>
          <ImageList sx={{ height: 450, display: {xs: "flex", sm: "grid"}, flexDirection: "column", width: {xs: "100%", sm: 500} }}>
              {menAvatars.map((avatar_select) => (
                <ImageListItem 
                  sx={{
                    margin: "10px", 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    border: avatar === avatar_select.id && `1px solid ${main_color}`,
                  }} 
                  key={avatar_select.img}
                  onClick= {() => setAvatar(avatar_select.id)}
                >
                  <img
                    src={`${avatar_select.img}`}
                    srcSet={`${avatar_select.img} 2x`}
                    alt={avatar_select.title}
                    loading="lazy"
                    style={{borderRadius: '50%', width: "70%"}}
                  />
                  <ImageListItemBar
                    title={avatar_select.title}
                    position="below"
                    // sx={{color}}
                  />
                </ImageListItem>
              ))}
          </ImageList>
          <Typography vareint="h5">
            WOMEN
          </Typography>
          <ImageList sx={{ height: 450, display: {xs: "flex", sm: "grid"}, flexDirection: "column", width: {xs: "100%", sm: 500} }}>
              {womenAvatars.map((avatar_select) => (
                <ImageListItem 
                  sx={{
                    margin: "10px", 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    border: avatar === avatar_select.id && `1px solid ${main_color}`,
                  }} 
                  key={avatar_select.id}
                  onClick= {() => setAvatar(avatar_select.id)}
                >
                  <img
                    src={`${avatar_select.img}`}
                    srcSet={`${avatar_select.img} 2x`}
                    alt={avatar_select.title}
                    loading="lazy"
                    style={{borderRadius: '50%', width: "70%"}}
                  />
                  <ImageListItemBar
                    title={avatar_select.title}
                    position="below"
                    // sx={{color}}
                  />
                </ImageListItem>
              ))}
          </ImageList>
        </DialogContent>
        <DialogActions sx={{backgroundColor: default_bg}}>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Formik
        onSubmit={handleFormSubmit}
        // the intial values when loading the form
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          // inherit the values in the Formik
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    // the handleBluer is built in in the Formik component
                    onBlur={handleBlur}
                    // the handleChange is built in in the Formik component
                    onChange={handleChange}
                    // the values var are the intialValues passed to the Formik components
                    value={values.firstName}
                    name="firstName"
                    // errors and helper tests is coming from the yup validation
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={Boolean(touched.location) && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 4" }}
                  />


                  <Box sx={{margin: 0, textAlign: 'center', width: '260px', display: 'flex', flexDirection: 'row'}}>
                    <Box sx={{margin: 0, textAlign: 'center', width: '130px', display: 'flex', flexDirection: 'column'}}>
                      <Button
                        sx={{
                          m: "auto",
                          p: "1rem",
                          backgroundColor: palette.primary.main,
                          color: palette.background.alt,
                          width: "100%",
                          float:"left",
                          justifyContent: "center",
                          alignItems: "center",
                          "&:hover": { color: palette.primary.main },
                        }}
                        onClick={chooseAvatar}
                      >
                        Choose avatar
                      </Button>
                      <Typography sx={{mt: '10px', mb: '0', textAlign: 'center'}} variant="h5">{avatar}</Typography>
                    </Box>
                    <img style={{width: '100px', marginLeft: '30px'}} src={`https://social-ali-api.onrender.com/assets/${avatar}`} alt={avatar} />
                  </Box>

                  {/* <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      // only accept those file types
                      acceptedFiles=".jpg,.jpeg,.png"
                      // can't put more than one file
                      multiple={false}
                      // set the picutre filed in the Formik component manually because you are using dropzone
                      onDrop={(acceptedFiles) =>
                        // this is the acceptedFiles[0] 
                        /*
                        path: "p4.jpeg" lastModified: 1685750635202, name: "p4.jpeg", size: 91750, type: "image/jpeg", webkitRelativePath: "", lastModifiedDate: Sat Jun 03 2023 03:03:55 GMT+0300 (Eastern European Summer Time) {}
                        *
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box> */}
                </>
              )}

              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  transition: '0.3s',
                  textDecoration: 'none',
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </>
  )
}



const menAvatars = [
  {
    img: 'https://social-ali-api.onrender.com/assets/avatar1.png',
    title: 'Avatar1',
    id: 'avatar1.png',
  },
  {
    img: 'https://social-ali-api.onrender.com/assets/avatar2.png',
    title: 'Avatar2',
    id: 'avatar2.png',
  },
  {
    img: 'https://social-ali-api.onrender.com/assets/avatar3.png',
    title: 'Avatar3',
    id: 'avatar3.png',
  },
  {
    img: 'https://social-ali-api.onrender.com/assets/avatar4.png',
    title: 'Avatar4',
    id: 'avatar4.png',
  },
  {
    img: 'https://social-ali-api.onrender.com/assets/avatar5.png',
    title: 'Avatar5',
    id: 'avatar5.png',
  },
  {
    img: 'https://social-ali-api.onrender.com/assets/avatar6.png',
    title: 'Avatar6',
    id: 'avatar6.png',
  },
  ];

const womenAvatars = [
  {
    img: 'https://social-ali-api.onrender.com/assets/avatar11.png',
    title: 'Avatar11',
    id: 'avatar11.png',
  },
  {
    img: 'https://social-ali-api.onrender.com/assets/avatar12.png',
    title: 'Avatar12',
    id: 'avatar12.png',
  },
  {
    img: 'https://social-ali-api.onrender.com/assets/avatar13.png',
    title: 'Avatar13',
    id: 'avatar13.png',
  },
  {
    img: 'https://social-ali-api.onrender.com/assets/avatar14.png',
    title: 'Avatar14',
    id: 'avatar14.png',
  },
  {
    img: 'https://social-ali-api.onrender.com/assets/avatar15.png',
    title: 'Avatar15',
    id: 'avatar15.png',
  },
  {
    img: 'https://social-ali-api.onrender.com/assets/avatar16.png',
    title: 'Avatar16',
    id: 'avatar16.png',
  },
];



export default Form