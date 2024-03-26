import Link from "next/link";
import { Container } from "@/components/layouts";

export const Header = () => {
  const isLoggedIn = false;

  return (
    <header>
      {/* Left side */}
      <Container className="relative z-50 flex justify-between">
        <div className="navbar bg-base-100 pt-6">
          <div className="flex-1">
            <Link href="/" aria-label="Home">
              <div className="flex">
                <div className="flex-1">
                  <button className="btn btn-ghost text-2xl">Nomadia</button>
                </div>
              </div>
            </Link>
            <div className="hidden lg:flex pl-6">
              <Link href="/places" aria-label="Places">
                <div className="px-6">Places</div>
              </Link>
              <Link href="/feeds" aria-label="Feeds">
                <div className="px-6">Feeds</div>
              </Link>
              <Link href="/pricing" aria-label="Pricing">
                <div className="px-6">Pricing</div>
              </Link>
              <Link href="/about" aria-label="About">
                <div className="px-6">About</div>
              </Link>
            </div>
          </div>

          {/* Right side */}
          {isLoggedIn ? (
            <div className="hidden lg:flex">
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">Profile</a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex">
              <button className="btn btn-neutral mx-2">Login</button>
              <button className="btn btn-primary">Sign up</button>
            </div>
          )}

          {/* Toggle Sidebar */}
          <div className="lg:hidden">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer"
                  className="btn btn-square btn-ghost drawer-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-5 h-5 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>

              {/* Drawer */}
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                  {/* Sidebar contents */}
                  <div className="pt-4" />
                  <li>
                    <a className="text-xl justify-center">Places</a>
                  </li>
                  <li>
                    <a className="text-xl justify-center">Feeds</a>
                  </li>
                  <li>
                    <a className="text-xl justify-center">Pricing</a>
                  </li>
                  <li>
                    <a className="text-xl justify-center">About</a>
                  </li>
                  <div className="my-4" />
                  <button className="btn btn-neutral">Login</button>
                  <div className="my-2" />
                  <button className="btn btn-primary">Sign up</button>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};
