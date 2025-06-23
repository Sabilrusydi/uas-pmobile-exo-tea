import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, MenuIcon, XIcon } from '@heroicons/react/solid';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-2xl font-bold text-purple-600">EXO TEA</a>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/">
                <a className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              </Link>
              <Link href="/produk">
                <a className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Produk</a>
              </Link>
              <Link href="/kontak">
                <a className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Kontak</a>
              </Link>
              {session?.user.role === 'admin' && (
                <Link href="/admin/dashboard">
                  <a className="text-red-500 hover:bg-red-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Admin Panel</a>
                </Link>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            {status === 'loading' && <div className="text-sm">...</div>}
            {status === 'unauthenticated' && (
              <Link href="/login">
                <a className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700">Login</a>
              </Link>
            )}
            {status === 'authenticated' && (
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                    {session.user.email}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  as="div"
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a href="#" className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                            Profil Saya
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm`}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/">
                <a className="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
              </Link>
              <Link href="/produk">
                <a className="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Produk</a>
              </Link>
              <Link href="/kontak">
                <a className="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Kontak</a>
              </Link>
               {session?.user.role === 'admin' && (
                <Link href="/admin/dashboard">
                  <a className="text-red-500 hover:bg-red-600 hover:text-white block px-3 py-2 rounded-md text-sm font-medium">Admin Panel</a>
                </Link>
              )}
              {status !== 'authenticated' ? (
                 <Link href="/login">
                  <a className="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</a>
                </Link>
              ) : (
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center px-5">
                    <div className="text-base font-medium leading-none text-gray-600">{session.user.email}</div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                      <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-white hover:bg-gray-700">Profil Saya</a>
                      <button onClick={() => signOut()} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-white hover:bg-gray-700">
                        Logout
                      </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
}