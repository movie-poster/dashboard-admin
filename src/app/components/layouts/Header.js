import React, { useState } from "react";
import { useSelector } from "react-redux";

import DefualtProfile from "../../../assets/profile-pic.svg";

function Header() {
  const [dark, setDark] = useState(false);
  const { name } = useSelector(state => state.loginSlice.auth);

  const switchMode = () => {
    if (!dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    setDark(!dark);
  }

  return (
    <nav className="header-principal">
      {/* <input type="checkbox" id="switch-mode" hidden />
        <label htmlFor="switch-mode" className="switch-mode" onClick={()=>switchMode()}></label> */}
      <a href="#/" className="profile">
        <img src={DefualtProfile}
          className="d-bloc" alt={name} />
      </a>


      <div>
        <div className="row">
          <div className="col">
            <i className="fa-solid fa-bell text-purple fs-5"></i>
            <span className="position-absolute top-2 start-1 translate-middle badge rounded-pill bg-info p-1">
              1
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>

          <div className="col">
            <i className="fa-solid fa-message text-purple fs-5"></i>
            <span className="position-absolute top-2 start-1 translate-middle badge rounded-pill bg-info p-1">
              5
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Header;