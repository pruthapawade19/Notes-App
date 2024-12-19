import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu, Logout } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import logo from "./images/GPA_logo.png";
import { useNavigate } from 'react-router-dom';

const Header = styled(AppBar)`
  z-index: 1201;
  background: #fff;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
`;

const Heading = styled(Typography)`
  color: #5F6368;
  font-size: 24px;
  margin-left: 25px;
`;

const LogoutButton = styled(IconButton)`
  margin-left: auto;
`;

const HeaderBar = ({ open, handleDrawer }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.setItem("user","");
    navigate("/")
  };

  return (
    <Header open={open}>
      <Toolbar>
        <IconButton
          onClick={() => handleDrawer()}
          sx={{ marginRight: '20px' }}
          edge="start"
        >
          <Menu />
        </IconButton>
        <img src={logo} alt="logo" style={{ width: 30 }} />
        <Heading>Notes App</Heading>
        <LogoutButton onClick={handleLogout} edge="end">
          <Logout />
        </LogoutButton>
      </Toolbar>
    </Header>
  )
};

export default HeaderBar;
