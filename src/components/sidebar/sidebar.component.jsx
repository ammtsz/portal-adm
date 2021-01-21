import React from "react";
import "./sidebar.styles.scss";

import SidebarItem from "../sidebar-item/sidebar-item.component";

import SIDEBAR_ROUTES from "../../datas/routes.data";

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/currentUser/current-user.selectors'
import { selectShowSidebar } from '../../redux/sidebar/sidebar.selectors'
import { setShowSidebarAction } from '../../redux/sidebar/sidebar.actions'


const Sidebar = ({currentUser, showSidebar, setShowSidebar}) => {

  // decides which route will be displayed based on `SIDEBAR_ROUTES` datas
  const sidebarRoutes = SIDEBAR_ROUTES.filter((route) =>
    route.sidebar && currentUser ? route.loggedIn : route.loggedOut
  );

  return (
    <aside className="sidebar_ ">
      {showSidebar ? (
        <div
          onMouseLeave={() => setShowSidebar(false)}
          onClick={() => setShowSidebar(false)}
          className="sidebar__show"
        >
          <ul className="sidebar__show--list   navbar-nav">
            {sidebarRoutes.map(({ id, ...otherPagesProps }) => (
              <SidebarItem key={id} {...otherPagesProps} />
            ))}
          </ul>
        </div>
      ) : (
        <div
          onMouseEnter={() => setShowSidebar(true)}
          onClick={() => setShowSidebar(true)}
          className="sidebar__hide"
        >
          <i className="fas fa-chevron-right"></i>
        </div>
      )}
    </aside>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  showSidebar: selectShowSidebar,
})

const mapDispatchToProps = dispatch => ({
  setShowSidebar: (data) => dispatch(setShowSidebarAction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
