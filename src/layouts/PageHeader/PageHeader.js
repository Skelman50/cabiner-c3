import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef
} from "react";
import useMediaQuery from "react-use-media-query-hook";
import { Segment, Menu, Image, Icon } from "semantic-ui-react";
import yavir from "../../assets/images/yavir.png";
import Backdrop from "../../navigation/MobileNavigation/BackDrop";
import SideDrawer from "../../navigation/MobileNavigation/SideNav";

import "./PageHeader.css";
import ContragentsList from "../../components/shared/ContragentsList/ContragentsList";
import DropDownMenu from "../../components/shared/DropDownMenu/DropDownMenu";
import ContagentInfo from "../../components/shared/ContagentInfo/ContragentInfo";
import DesktopNavigation from "../../navigation/DesktopNavigation/DesktopNavigation";
import { AuthContext } from "../../context/auth/auth-context";
import { useLocation } from "react-router-dom";
import { ContractsContext } from "../../context/contracts/contracts-context";
import ArchiveBottomNavigation from "../../components/archives/ArchiveBottomNavigation/ArchiveBottomNavigation";
import SettingsBottomNavigation from "../../components/settings/SettingsBottomNavigation";

const PageLayout = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isContragentMenu, setIsContagentMenu] = useState(false);
  const { isLoggedIn, currentUser, getContragentSettings, token } = useContext(
    AuthContext
  );
  const { loadingContracts } = useContext(ContractsContext);
  const location = useLocation();

  const currentUserRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn) {
      if (currentUser) {
        getContragentSettings(currentUser, token);
        return;
      }
    }
    if (currentUserRef.current || !currentUser) return;
    currentUserRef.current = currentUser;
    getContragentSettings(currentUser, token);
  }, [getContragentSettings, currentUser, token, isLoggedIn]);

  const handleCloseDrawer = () => {
    setDrawerIsOpen(false);
  };
  const handleClickContragentMenu = () => {
    setIsContagentMenu(prevState => !prevState);
  };

  const handleCloseContragentMenu = useCallback(() => {
    setIsContagentMenu(false);
  }, []);

  const isMobile = useMediaQuery("(max-width: 650px)");
  const ismaxHeight = useMediaQuery("(max-height: 450px)");

  if (ismaxHeight && location.pathname === "/login") return null;

  return (
    <div className="main-header">
      {drawerIsOpen && <Backdrop onClick={handleCloseDrawer} />}
      <SideDrawer show={drawerIsOpen} onClick={handleCloseDrawer} />
      <Segment inverted className="segment-no-border no-radius no-margin">
        <Menu inverted pointing secondary className="nav-header">
          {!isMobile && <DesktopNavigation />}
          {isMobile && (
            <Menu.Menu position="left" className="side-nav-icon">
              <Icon
                name="bars"
                size="big"
                onClick={() => setDrawerIsOpen(true)}
              />
            </Menu.Menu>
          )}

          {isLoggedIn && (
            <Menu.Menu position="right" className="contragent-menu">
              <ContragentsList
                handleClickModal={
                  loadingContracts ? null : handleClickContragentMenu
                }
              />
              <ContagentInfo />
            </Menu.Menu>
          )}

          <Menu.Menu
            position="right"
            className="logo"
            onClick={() => window.open("https://yavir2000.com/")}
          >
            <Image src={yavir} alt="" style={{ height: "50px" }} />
          </Menu.Menu>
          {isContragentMenu && (
            <DropDownMenu handleClose={handleCloseContragentMenu} />
          )}
        </Menu>
      </Segment>
      {location.pathname.includes("archives") && <ArchiveBottomNavigation />}
      {location.pathname.includes("settings") && !ismaxHeight && (
        <SettingsBottomNavigation />
      )}
    </div>
  );
};

export default PageLayout;
