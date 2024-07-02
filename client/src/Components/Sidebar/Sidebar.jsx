import React from "react";
import { SiFeedly } from "react-icons/si";
import { BiSolidVideos } from "react-icons/bi";
import { MdOutlineGroups } from "react-icons/md";
import { IoLogoWechat } from "react-icons/io5";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaPhoenixFramework } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";
import { MdEmojiEvents } from "react-icons/md";
import "../../App.css";
import { Friends } from "../../data/dummyData";
import FriendsList from "../FriendsList/FriendList";
const Sidebar = () => {
  return (
    <div
      style={{ flex: 3, height: "calc(100vh-45px)" }}
      className=" h-screen custom-scrollbar overflow-y-scroll sticky top-[50px] "
    >
      <div className=" p-[20px] z-[-4]">
        <ul className="sidebarList m-0 p-0">
          <li>
            <SiFeedly />
            <span>Feed</span>
          </li>
          <li>
            <BiSolidVideos />
            <span>Videos</span>
          </li>
          <li>
            <MdOutlineGroups />
            <span>Groups</span>
          </li>
          <li>
            <IoLogoWechat />
            <span>Chat</span>
          </li>
          <li>
            <BsFillBookmarkStarFill />
            <span>Bookmarks</span>
          </li>
          <li>
            <FaRegQuestionCircle />
            <span>Questions</span>
          </li>
          <li>
            <FaPhoenixFramework />
            <span>Jobs</span>
          </li>
          <li>
            <SiCoursera />
            <span>Courses</span>
          </li>
          <li>
            <MdEmojiEvents />
            <span>Events</span>
          </li>
        </ul>
        <div className="button">
          <button className="rounded-md w-[100px] p-[5px] bg-slate-200 ">
            See more
          </button>
        </div>
        <hr className="mt-[10px]"></hr>
      </div>
      <div className="my-[10px]">
        <ul className="sidebarList">
          {Friends.map((friend) => (
            <FriendsList key={friend.id} friend={friend} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
