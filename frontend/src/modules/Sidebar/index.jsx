import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUserPlus,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export const Sidebar = ({ onTabChange }) => {
  const [toggleSidebar, setToggelSideBar] = useState(true);

  return (
    <div
      className={`h-full bg-slate-200 flex flex-col overflow-x-!hidden z-20 order-first ${
        toggleSidebar ? "w-[200px] items-start px-6" : "w-[50px] items-center"
      }`}
    >
      <FontAwesomeIcon
        icon={faBars}
        size="xl"
        onClick={() =>
          setToggelSideBar((prevtoggleSidebar) => !prevtoggleSidebar)
        }
        className="mt-10 cursor-pointer"
      />
      <div className="w-full mt-10 flex flex-col">
        <div
          onClick={() => onTabChange("chats")}
          className={`hover:bg-Light py-3 w-full text-center cursor-pointer mt-10 flex ${
            toggleSidebar ? "flex-row px-1" : "flex-col mx-auto"
          }`}
        >
          <FontAwesomeIcon
            icon={faMessage}
            size={`${toggleSidebar ? "xl" : "lg"}`}
            className={``}
          />
          <span className={`${toggleSidebar ? "text-lg ms-3" : "text-sm"}`}>
            Chats
          </span>
        </div>
        <div
          onClick={() => onTabChange("add-users")}
          className={`hover:bg-Light py-3 w-full text-center cursor-pointer mt-10 flex ${
            toggleSidebar ? "flex-row px-1" : "flex-col mx-auto"
          }`}
        >
          <FontAwesomeIcon
            icon={faUserPlus}
            size={`${toggleSidebar ? "xl" : "lg"}`}
            className={``}
          />
          <span className={`${toggleSidebar ? "text-lg ms-3" : "text-sm"}`}>
            Add Users
          </span>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  onTabChange: PropTypes.func,
};
