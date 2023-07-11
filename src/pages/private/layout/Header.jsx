import { Avatar } from "@mui/material";
import ProfileDropDown from "./Header.ProfileDropDown";

export default function Header(){
    return (
        <div
          className="px-5 d-flex flex-row flex-wrap align-items-center"
          style={{ height: "80px", color: '#88d8f3', background: 'white', borderBottom: "3px solid #E3E8EA" }}
        >
          <ProfileDropDown />
        </div>
      );
};