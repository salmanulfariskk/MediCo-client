import { Link } from "react-router-dom";
import HeaderItem from "./HeaderItem";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";

const navItems = [
  { to: "/doctors", icon: "Doctors" },
  { to: "/appointments", icon: "Appointments" },
];
function Header() {
  const [isLoggedIn] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [fixed, setFixed] = useState(false);
  const handleScroll = () => {
    setFixed(() => {
      if (window.scrollY > 64) {
        return true;
      }
      return false;
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={` z-10 ${fixed ? "sticky top-0 bg-white" : "relative h-0"}`}
    >
      <div className="container mx-auto max-w-[1280px]">
        <div className="flex justify-between items-center py-3">
          <div className="md:hidden relative ml-3">
            <button onClick={() => setOpenMenu((prev) => !prev)} className="">
              <MdMenu className="size-7"/>
            </button>
            {openMenu && (
              <div className="p-2 rounded-md flex flex-col bg-white absolute top-[100%]">
                {renderMenuItems(isLoggedIn)}
              </div>
            )}
          </div>
          <Link
            to="/"
            className="logo flex items-center gap-1 hover:bg-black/5 -m-2 p-2 rounded-lg active:scale-95 text-2xl"
          >
            <img className="block w-10 h-10" src="/logo.png" alt="" />
            <h1 className="font-semibold">MediCo</h1>
          </Link>
          <div className="parts hidden md:flex gap-5">
            {renderMenuItems(isLoggedIn)}
          </div>
          <div className="profile">
            {isLoggedIn ? (
              <h1>Profile</h1>
            ) : (
              <HeaderItem to={"/"} icon={"login"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderMenuItems(isLoggedIn) {
  return (
    <>
      <HeaderItem to={"/"} icon={"Home"} />
      {isLoggedIn &&
        navItems.map((item) => (
          <HeaderItem to={item.to} icon={item.icon} key={item.to} />
        ))}
    </>
  );
}

export default Header;
