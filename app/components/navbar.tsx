import Link from "next/link";

type UserRole = "none" | "user" | "moderator" | "admin";

interface NavbarProps {
  role: UserRole;
}

const Navbar: React.FC<NavbarProps> = ({ role }) => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-teal-600">
          Meuble&Co
        </Link>
        <nav className="space-x-6 flex items-center">
          <Link href="/annonces" className="text-gray-700 hover:text-teal-600">
            Découvrir
          </Link>
          {(role === "user" || role === "moderator" || role === "admin") && (
            <Link href="/create-annonce" className="text-gray-700 hover:text-teal-600">
              Vendre
            </Link>
          )}
          {(role === "moderator" || role === "admin") && (
            <Link href="/gestion-annonces" className="text-gray-700 hover:text-teal-600">
              Gestion des annonces
            </Link>
          )}
          {role === "admin" && (
            <Link href="/gestion-moderateurs" className="text-gray-700 hover:text-teal-600">
              Gestion des modérateurs
            </Link>
          )}
          {role === "none" ? (
            <Link href="/login" className="ml-4 px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700">
              Login
            </Link>
          ) : (
            <Link href="/logout" className="ml-4 px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
              Logout
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
