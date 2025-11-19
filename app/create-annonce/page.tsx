"use client";

import NavbarWrapper from "../components/navbarWarrper";
import Annonce from "../components/annonce";
import Footer from "../components/footer";
import { useEffect, useState } from "react";

const url = process.env.NEXT_PUBLIC_URL;

export default function GestionAnnonces() {
  interface Furniture {
    id: number;
    title: string;
    description: string;
    city: string;
    images: string;
    status: string;
    price: number;
    created_at: string;
    updated_at: string;
    color?: string;
    material?: string;
    user_id: number;
    user_mail: string;
  }

  const [furnitures, setFurnitures] = useState<Furniture[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFurnitures = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch(
          `${url}/furnitures/users/${status}/${encodeURIComponent(search)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setFurnitures(data);
        }
      } catch (e) {
        // Gérer l'erreur ici
      }
      setLoading(false);
    };
    fetchFurnitures();
  }, [status, search]);

  return (
    <div className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
      <NavbarWrapper />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-teal-700 mb-1">Mes annonces</h1>
              <p className="text-base text-gray-600">
                Voir, modifier et resoumettre vos annonces refusées.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Annonce />
            </div>
          </header>

          <div className="mb-8 flex flex-col sm:flex-row gap-3 items-center">
            <input
              id="search"
              type="text"
              placeholder="Rechercher par titre, description ou ville..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="px-4 py-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 shadow"
              aria-label="Filtrer par statut"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="attente de validation">En attente</option>
              <option value="valider">Validée</option>
              <option value="refuser">Refusée</option>
              <option value="vendu">Vendu</option>
            </select>
            <button
              id="searchBtn"
              className="px-6 py-2 bg-teal-600 text-white rounded-full font-semibold shadow hover:bg-teal-700 transition"
              onClick={() => {}}
            >
              Rechercher
            </button>
            <button
              id="clearBtn"
              className="px-6 py-2 bg-white border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition shadow"
              onClick={() => {
                setSearch("");
                setStatus("all");
              }}
            >
              Effacer
            </button>
          </div>

          <main id="list" className="space-y-6">
            {loading && <div>Chargement...</div>}
            {!loading && furnitures.length === 0 && (
              <div className="text-gray-500 text-center">Aucune annonce trouvée.</div>
            )}
            {furnitures.map((furniture) => (
              <article
                key={furniture.id}
                className="bg-white p-6 rounded-2xl shadow flex flex-col sm:flex-row gap-6 items-start"
                data-title={furniture.title}
                data-description={furniture.description}
                data-city={furniture.city}
                data-id={furniture.id}
              >
                {furniture.images && furniture.images.split(",")[0] ? (
                  <div
                    className="card-img bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center"
                    style={{ width: "120px", height: "120px", minWidth: "120px" }}
                  >
                    <img
                      src={url + furniture.images.split(",")[0]}
                      alt={furniture.title}
                      className="object-cover w-full h-full"
                      style={{ maxWidth: "120px", maxHeight: "120px" }}
                    />
                  </div>
                ) : (
                  <div
                    className="card-img bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center"
                    style={{ width: "120px", height: "120px", minWidth: "120px" }}
                  >
                    <span className="text-gray-400 text-xs">Pas d'image</span>
                  </div>
                )}

                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h2 className="text-2xl font-bold text-teal-700">{furniture.title}</h2>
                      <div className="text-sm text-gray-600">{furniture.city}</div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold status ${
                        furniture.status === "valider"
                          ? "bg-green-100 text-green-800"
                          : furniture.status === "refuser"
                          ? "bg-red-100 text-red-800"
                          : furniture.status === "attente de validation"
                          ? "bg-yellow-100 text-yellow-800"
                          : furniture.status === "vendu"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {furniture.status}
                    </div>
                  </div>

                  <p className="mt-3 text-base text-gray-700">{furniture.description}</p>

                  <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="text-xl font-bold text-teal-700">{furniture.price} €</div>
                    <div className="flex items-center gap-2">
                      <button className="btn-view px-4 py-1 bg-white border border-teal-600 text-teal-600 rounded-full font-semibold hover:bg-teal-50 transition">
                        Voir
                      </button>
                      <button className="btn-edit px-4 py-1 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition">
                        Modifier
                      </button>
                      <button
                        onClick={async () => {
                          if (
                            confirm(
                              `Veux-tu vraiment supprimer l'annonce ${furniture.title} ?`
                            )
                          ) {
                            fetch(`${url}/furnitures/users/${furniture.id}`, {
                              method: "DELETE",
                              headers: {
                                authorization: `Bearer ${sessionStorage.getItem("token")}`,
                              },
                            }).then(async (response) => {
                              if (response.status !== 200) {
                                window.location.href = "/";
                              } else {
                                let data = await response.json();
                                alert(data["success"]);
                                window.location.reload();
                              }
                            });
                          }
                        }}
                        className="btn-delete px-4 py-1 bg-gray-200 rounded-full font-semibold text-gray-700 hover:bg-gray-300 transition"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-gray-500">
                    Créé: {furniture.created_at} • mis à jour: {furniture.updated_at}
                  </div>

                  <div className="mt-2 text-xs text-gray-500">
                    Couleur: {furniture.color || "N/A"} • Matériau: {furniture.material || "N/A"}
                  </div>
                </div>
              </article>
            ))}
          </main>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
