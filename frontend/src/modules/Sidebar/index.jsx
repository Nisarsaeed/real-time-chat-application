import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUserPlus,
  faMessage,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const Sidebar = ({ onTabChange }) => {
  const [toggleSidebar, setToggelSideBar] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`h-full bg-slate-200 flex flex-col !overflow-x-hidden z-20 order-first relative ${
        toggleSidebar ? "w-[200px] items-start px-6" : "w-[80px] items-center"
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
          className={`hover:bg-slate-300 py-3 w-full text-center cursor-pointer mt-10 flex rounded-lg ${
            toggleSidebar ? "flex-row px-1" : "flex-col mx-auto"
          }`}
        >
          <FontAwesomeIcon
            icon={faMessage}
            size={`${toggleSidebar ? "xl" : "lg"}`}
            className={``}
          />
          <span className={`${toggleSidebar ? "text-lg ms-3" : "text-xs"}`}>
            Chats
          </span>
        </div>
        <div
          onClick={() => onTabChange("add-users")}
          className={`hover:bg-slate-300 py-3 w-full text-center cursor-pointer mt-10 flex rounded-lg ${
            toggleSidebar ? "flex-row px-1" : "flex-col mx-auto"
          }`}
        >
          <FontAwesomeIcon
            icon={faUserPlus}
            size={`${toggleSidebar ? "xl" : "lg"}`}
            className={``}
          />
          <span className={`${toggleSidebar ? "text-lg ms-3" : "text-xs"}`}>
            Add Users
          </span>
        </div>
      </div>
      <div
        onClick={() => {
          localStorage.removeItem("user:detail");
          localStorage.removeItem("user:token");
          navigate("/sign_in");
        }}
        className={`hover:bg-slate-300 py-3 w-3/4 text-center cursor-pointer flex absolute bottom-10 rounded-lg  ${
          toggleSidebar ? "flex-row px-1" : "flex-col mx-auto"
        }`}
      >
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          size="xl"
          className=""
        />
        <span className={`${toggleSidebar ? "text-lg ms-3" : "text-xs"}`}>
          Logout
        </span>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  onTabChange: PropTypes.func,
};
