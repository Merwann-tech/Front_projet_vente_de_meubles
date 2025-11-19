export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-10 bottom-0 left-0 w-full">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        <div className="text-sm">
          &copy; 2025 Meuble&Co. Tous droits réservés.
        </div>
        <div className="space-x-4">
          <a href="#" className="hover:underline">
            Mentions légales
          </a>
          <a href="#" className="hover:underline">
            Confidentialité
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
