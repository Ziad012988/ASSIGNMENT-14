import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCamera } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-50 bg-[#161616]">
        <div className="flex justify-between align-items-center  w-[95%]  m-auto mt-4 mb-4">
          <div className="flex gap-5  ">
            <div className="flex gap-2">
              <div className="text-[50px] text-[#ed9624] hover:scale-[1.05] transition-all duration-200">
                <MdOutlineCamera />
              </div>
              <div className="peer">
                <h2 className="text-[20px] font-bold text-white">عدسة</h2>
                <p className="text-[12px] text-[#ed9624] ">
                  عالم التصوير الفوتوغرافي
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:block rounded-full outline-1 outline-offset-0 outline-[#252525]">
            <ul className="flex flex-wrap items-center justify-center gap-3 p-2 sm:gap-5 sm:p-3 md:gap-8">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `text-[13px] sm:text-[14px] md:text-[15px] transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "text-white bg-linear-to-r from-[#f66d14] to-[#ed5d0e] rounded-full px-3 py-1.5 sm:p-2"
                        : "text-[#737373] hover:text-white px-1"
                    }`
                  }
                  to="home"
                >
                  الرئيسية
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `text-[13px] sm:text-[14px] md:text-[15px] transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "text-white bg-linear-to-r from-[#f66d14] to-[#ed5d0e] rounded-full px-3 py-1.5 sm:p-2"
                        : "text-[#737373] hover:text-white px-1"
                    }`
                  }
                  to="blog"
                >
                  المدونه
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `text-[13px] sm:text-[14px] md:text-[15px] transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "text-white bg-linear-to-r from-[#f66d14] to-[#ed5d0e] rounded-full px-3 py-1.5 sm:p-2"
                        : "text-[#737373] hover:text-white px-1"
                    }`
                  }
                  to="about"
                >
                  من نحن
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="hidden sm:flex gap-3">
            <div
              className="flex items-center justify-center p-2.5 text-[20px] text-[#737373] hover:outline-1 outline-offset-0
            rounded-xl   outline-[#737373] hover:text-[#ed5d0e] transition-all duration-300 "
            >
              <IoSearch />
            </div>
            <Link
              to="/blog"
              className="rounded-full p-3.5 pr-7 pl-7 bg-linear-to-r from-[#f66d14] to-[#ed5d0e] text-white font-bold text-[14px] hover:-translate-y-0.5 transition-all duration-400"
            >
              ابدأ القراءة
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex md:hidden items-center justify-center text-[28px] text-white"
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden w-[95%] m-auto pb-5">
            <ul className="flex flex-col gap-4 text-center">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `text-[15px] transition-all duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-[#737373] hover:text-white"
                    }`
                  }
                  to="home"
                  onClick={() => setOpen(false)}
                >
                  الرئيسية
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `text-[15px] transition-all duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-[#737373] hover:text-white"
                    }`
                  }
                  to="Blog"
                  onClick={() => setOpen(false)}
                >
                  المدونه
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `text-[15px] transition-all duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-[#737373] hover:text-white"
                    }`
                  }
                  to="About"
                  onClick={() => setOpen(false)}
                >
                  من نحن
                </NavLink>
              </li>
            </ul>

            <div className="flex justify-center gap-3 mt-5">
              <div className="flex items-center justify-center p-2.5 text-[20px] text-[#737373] outline-1 outline-offset-0 rounded-xl outline-[#737373] hover:text-[#ed5d0e] transition-all duration-300 ">
                <IoSearch />
              </div>
              <button className="rounded-full pr-7 pl-7 bg-linear-to-r from-[#f66d14] to-[#ed5d0e] text-white font-bold text-[14px] hover:-translate-y-0.5 transition-all duration-400">
                ابدأ القراءة
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
