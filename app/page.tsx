import NavbarWrapper from "./components/navbarWarrper";
import Footer from "./components/footer";
export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
      <NavbarWrapper />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-teal-700">
            Bienvenue sur Meuble&Co
          </h1>
          <p className="mb-6 text-xl text-gray-700 max-w-2xl">
            Le site de revente de meubles d’occasion entre particuliers et
            professionnels. Donnez une seconde vie à vos meubles, dénichez des
            pépites et faites des économies tout en préservant la planète !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/annonces"
              className="bg-teal-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow hover:bg-teal-700 transition"
            >
              Voir les annonces
            </a>
            <a
              href="/login"
              className="bg-white border border-teal-600 text-teal-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-teal-50 transition"
            >
              Déposer une annonce
            </a>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Pourquoi choisir Meuble&Co ?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <svg
                  className="w-14 h-14 text-teal-500 mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M14.31 8l5.74 9.94M9.69 8h11.13M7.38 12.94L1.64 3" />
                  <path d="M22.26 3L12 21.23 1.74 3" />
                </svg>
                <h3 className="font-semibold text-lg mb-2">Éco-responsable</h3>
                <p className="text-gray-600 text-center">
                  Contribuez à la réduction des déchets en achetant ou revendant
                  des meubles.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <svg
                  className="w-14 h-14 text-teal-500 mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M6 9v2m4-2v6m4-6v4" />
                </svg>
                <h3 className="font-semibold text-lg mb-2">Large choix</h3>
                <p className="text-gray-600 text-center">
                  Des centaines d’annonces de meubles, pour tous les styles et
                  budgets.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <svg
                  className="w-14 h-14 text-teal-500 mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v18m9-9H3" />
                </svg>
                <h3 className="font-semibold text-lg mb-2">Simple & rapide</h3>
                <p className="text-gray-600 text-center">
                  Publiez ou trouvez un meuble en quelques clics, sans frais
                  cachés.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>

    </div>
  );
}
