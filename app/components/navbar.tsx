import Link from "next/link";

type UserRole = "none" | "user" | "moderator" | "admin";

interface NavbarProps {
  role: UserRole;
}

const Navbar: React.FC<NavbarProps> = ({ role }) => {
  return (
    <nav className="bg-white shadow-md px-4 py-2 flex items-center gap-4">
      <Link href="/" className="font-bold">
        Accueil
      </Link>
      <div className="ml-auto flex items-center gap-2">
        {(role === "user" || role === "moderator" || role === "admin") && (
          <>
            <Link href="/create-annonce" className="btn-primary">
              Créer une annonce
            </Link>
            {(role === "moderator" || role === "admin") && (
              <Link href="/gestion-annonces" className="btn-tertiary">
                Gestion des annonces
              </Link>
            )}
            {role === "admin" && (
              <Link href="/gestion-moderateurs" className="btn-tertiary">
                Gestion des modérateurs
              </Link>
            )}
          </>
        )}
        {role === "none" ? (
          <Link href="/login" className="btn-primary">
            Login
          </Link>
        ) : (
          <Link href="/logout" className="btn-secondary">
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
