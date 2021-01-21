import React from "react";
import "./sidebar-item.styles.scss";

import { Link, withRouter } from "react-router-dom";

const SidebarItem = ({ id, linkUrl, icon, label, location }) => {
  return (
    <li
      id={id}
      className={` ${location.pathname === linkUrl ? 'active' : ''} sidebar__item`}
    >
      <Link to={linkUrl} className="sidebar__link   nav-link">
        <div className="sidebar__link--icon">
          <i className={icon}></i>
        </div>
        <p className="sidebar__item--text">{label.toUpperCase()}</p>
      </Link>
    </li>
  );
};

export default withRouter(SidebarItem);
