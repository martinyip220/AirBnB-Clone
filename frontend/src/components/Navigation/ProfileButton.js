import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link } from "react-router-dom";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        <i className="fas fa-bars nav_bars_icon"></i>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="login-user-dropdown">
              <li className="dropdown-li">
                <Link className="login-user-create-spot" to={"/spots/new"}>
                  Host your home
                </Link>
              </li>
              <li className="dropdown-li">
                {user.firstName} {user.lastName}
              </li>
              <li className="dropdown-li">{user.email}</li>
              <li className="dropdown-li">
                <button className="logout-btn" onClick={logout}>
                  Log Out
                </button>
              </li>
            </div>
          </>
        ) : (
          <>
            <div className="nav-dropdown">
              <div className="nav-btns">
                  <OpenModalMenuItem
                    className="login-signup-btns"
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div className="nav-btns">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
