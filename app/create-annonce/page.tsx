"use client";

import NavbarWrapper from "../components/navbarWarrper";
import Annonce from "../components/annonce";
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
    <div>
      <NavbarWrapper />
      <div className="max-w-6xl mx-auto p-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Mes annonces</h1>
            <p className="text-sm text-gray-600">
              Voir, modifier et resoumettre vos annonces refusées.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Annonce />
          </div>
        </header>

        <div className="mb-6 flex gap-3 items-center">
          <input
            id="search"
            type="text"
            placeholder="Rechercher par titre, description ou ville..."
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={() => {}}
          >
            Rechercher
          </button>
          <button
            id="clearBtn"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => {
              setSearch("");
              setStatus("all");
            }}
          >
            Effacer
          </button>
        </div>

        <main id="list" className="space-y-4">
          {loading && <div>Chargement...</div>}
          {!loading && furnitures.length === 0 && (
            <div className="text-gray-500">Aucune annonce trouvée.</div>
          )}
          {furnitures.map((furniture) => (
            <article
              key={furniture.id}
              className="bg-white p-4 rounded shadow flex gap-4 items-start"
              data-title={furniture.title}
              data-description={furniture.description}
              data-city={furniture.city}
              data-id={furniture.id}
            >
              {furniture.images && furniture.images.split(",")[0] ? (
                <div
                  className="card-img bg-gray-100 rounded overflow-hidden flex items-center justify-center"
                  style={{ width: "96px", height: "96px", minWidth: "96px" }}
                >
                  <img
                    src={url + furniture.images.split(",")[0]}
                    alt={furniture.title}
                    className="object-cover w-full h-full"
                    style={{ maxWidth: "96px", maxHeight: "96px" }}
                  />
                </div>
              ) : (
                <div
                  className="card-img bg-gray-100 rounded overflow-hidden flex items-center justify-center"
                  style={{ width: "96px", height: "96px", minWidth: "96px" }}
                >
                  <span className="text-gray-400 text-xs">Pas d'image</span>
                </div>
              )}

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{furniture.title}</h2>
                    <div className="text-sm text-gray-600">
                      {furniture.city}
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-sm status ${
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

                <p className="mt-2 text-sm text-gray-700">
                  {furniture.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-lg font-bold">{furniture.price} €</div>
                  <div className="flex items-center gap-2">
                    <button className="btn-view px-3 py-1 bg-white border border-indigo-500 text-indigo-600 rounded hover:bg-indigo-50">
                      Voir
                    </button>
                    <button className="btn-edit px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                      Modifier
                    </button>
                    <button 
                    onClick={async () => {
                        if (confirm(`Veux-tu vraiment supprimer l'annonce ${furniture.title} ?`)) {
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
                    className="btn-delete px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                      Supprimer
                    </button>
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  Créé: {furniture.created_at} • mis à jour:{" "}
                  {furniture.updated_at}
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  Couleur: {furniture.color || "N/A"} • Matériau:{" "}
                  {furniture.material || "N/A"}
                </div>
              </div>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}
