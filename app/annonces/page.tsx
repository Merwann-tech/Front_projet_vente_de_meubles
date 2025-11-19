"use client";
import React, { useState, useEffect } from "react";
import NavbarWrapper from "../components/navbarWarrper";
import Footer from "../components/footer";
import { useRouter } from "next/navigation";

export default function AnnoncesPage() {
  const [open, setOpen] = useState({
    ville: false,
    type: false,
    couleur: false,
    materiau: false,
  });

  interface searchparams {
    name: string;
  }
  const [cityList, setCityList] = useState<searchparams[]>([]);
  const [colorList, setColorList] = useState<searchparams[]>([]);
  const [materialList, setMaterialList] = useState<searchparams[]>([]);
  const [typeList, setTypeList] = useState<searchparams[]>([]);

  const [searchText, setSearchText] = useState("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [annonces, setAnnonces] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const cityRes = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/furnitures/cityListe`
        );
        const colorRes = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/furnitures/colorListe`
        );
        const materialRes = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/furnitures/materialListe`
        );
        const typeRes = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/furnitures/typeListe`
        );
        if (cityRes.ok) {
          const cityData = await cityRes.json();
          setCityList(cityData);
        }
        if (colorRes.ok) {
          const colorData = await colorRes.json();
          setColorList(colorData);
        }
        if (materialRes.ok) {
          const materialData = await materialRes.json();
          setMaterialList(materialData);
        }
        if (typeRes.ok) {
          const typeData = await typeRes.json();
          setTypeList(typeData);
        }
      } catch (e) {
        console.error("Erreur lors de la récupération des filtres", e);
      }
    };
    fetchFilters();
  }, []);

  const handleCheckbox = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const fetchAnnonces = async () => {
    try {
      const params = new URLSearchParams();
      if (searchText) params.append("query", searchText);
      selectedTypes.forEach((t) => params.append("type", t));
      selectedColors.forEach((c) => params.append("color", c));
      selectedMaterials.forEach((m) => params.append("material", m));
      selectedCities.forEach((v) => params.append("city", v));
      if (priceMin) params.append("priceMin", priceMin);
      if (priceMax) params.append("priceMax", priceMax);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/furnitures/search?${params.toString()}`
      );
      if (res.ok) {
        const data = await res.json();
        setAnnonces(data);
      } else {
        setAnnonces([]);
      }
    } catch (e) {
      console.error("Erreur lors de la récupération des annonces", e);
      setAnnonces([]);
    }
  };

  const toggle = (key: keyof typeof open) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    fetchAnnonces();
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
      <NavbarWrapper />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-extrabold mb-10 text-teal-700 text-center">
            Annonces de meubles
          </h1>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <aside className="w-full lg:w-80 bg-white rounded-2xl shadow-md p-6 space-y-7 mb-8 lg:mb-0">
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-teal-700"
                  htmlFor="searchText"
                >
                  Recherche
                </label>
                <input
                  id="searchText"
                  type="text"
                  placeholder="Titre, description..."
                  className="w-full px-3 py-2 border border-teal-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              {/* Ville */}
              <div>
                <button
                  type="button"
                  className="w-full flex justify-between items-center text-sm font-semibold mb-2 text-teal-700"
                  onClick={() => toggle("ville")}
                >
                  Ville
                  <span>{open.ville ? "▲" : "▼"}</span>
                </button>
                {open.ville && (
                  <div className="space-y-1 pl-2">
                    {cityList.map((city) => (
                      <label key={city.name} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={city.name}
                          checked={selectedCities.includes(city.name)}
                          onChange={() =>
                            handleCheckbox(
                              city.name,
                              selectedCities,
                              setSelectedCities
                            )
                          }
                          className="accent-teal-600"
                        />{" "}
                        {city.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Type */}
              <div>
                <button
                  type="button"
                  className="w-full flex justify-between items-center text-sm font-semibold mb-2 text-teal-700"
                  onClick={() => toggle("type")}
                >
                  Type
                  <span>{open.type ? "▲" : "▼"}</span>
                </button>
                {open.type && (
                  <div className="space-y-1 pl-2">
                    {typeList.map((type) => (
                      <label key={type.name} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={type.name}
                          checked={selectedTypes.includes(type.name)}
                          onChange={() =>
                            handleCheckbox(
                              type.name,
                              selectedTypes,
                              setSelectedTypes
                            )
                          }
                          className="accent-teal-600"
                        />{" "}
                        {type.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Couleur */}
              <div>
                <button
                  type="button"
                  className="w-full flex justify-between items-center text-sm font-semibold mb-2 text-teal-700"
                  onClick={() => toggle("couleur")}
                >
                  Couleur
                  <span>{open.couleur ? "▲" : "▼"}</span>
                </button>
                {open.couleur && (
                  <div className="space-y-1 pl-2">
                    {colorList.map((color) => (
                      <label key={color.name} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={color.name}
                          checked={selectedColors.includes(color.name)}
                          onChange={() =>
                            handleCheckbox(
                              color.name,
                              selectedColors,
                              setSelectedColors
                            )
                          }
                          className="accent-teal-600"
                        />{" "}
                        {color.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Matériau */}
              <div>
                <button
                  type="button"
                  className="w-full flex justify-between items-center text-sm font-semibold mb-2 text-teal-700"
                  onClick={() => toggle("materiau")}
                >
                  Matériau
                  <span>{open.materiau ? "▲" : "▼"}</span>
                </button>
                {open.materiau && (
                  <div className="space-y-1 pl-2">
                    {materialList.map((material) => (
                      <label
                        key={material.name}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          value={material.name}
                          checked={selectedMaterials.includes(material.name)}
                          onChange={() =>
                            handleCheckbox(
                              material.name,
                              selectedMaterials,
                              setSelectedMaterials
                            )
                          }
                          className="accent-teal-600"
                        />{" "}
                        {material.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-teal-700">
                  Prix minimum
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="Minimum (€)"
                  className="w-full px-3 py-2 border border-teal-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-teal-700">
                  Prix maximum
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="Maximum (€)"
                  className="w-full px-3 py-2 border border-teal-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                />
              </div>
              <button
                className="w-full py-2 mt-4 bg-teal-600 text-white rounded-full hover:bg-teal-700 font-semibold text-base shadow transition"
                onClick={fetchAnnonces}
                type="button"
              >
                Appliquer les filtres
              </button>
            </aside>

            {/* Affichage des annonces */}
            <section className="flex-1 space-y-6">
              {annonces.length === 0 ? (
                <div className="text-gray-500 text-center mt-10">
                  Aucune annonce trouvée.
                </div>
              ) : (
                annonces.map((annonce, idx) => (
                  <article
                    key={idx}
                    className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-start"
                  >
                    <div className="w-full md:w-48 h-32 bg-gray-100 rounded-xl shrink-0 overflow-hidden flex items-center justify-center">
                      {annonce.images && annonce.images.split(",")[0] ? (
                        <img
                          src={
                            process.env.NEXT_PUBLIC_URL +
                            annonce.images.split(",")[0]
                          }
                          alt={annonce.title || "meuble"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">
                          Aucune image
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h2 className="text-2xl font-bold text-teal-700">
                          {annonce.title}
                        </h2>
                        <button className="text-base text-white bg-teal-600 px-6 py-2 rounded-full font-semibold hover:bg-teal-700 transition shadow">
                          Acheter
                        </button>
                      </div>
                      <div className="text-gray-600 text-sm mb-2">
                        {[
                          annonce.city,
                          annonce.type,
                          annonce.color,
                          annonce.material,
                        ]
                          .filter(Boolean)
                          .join(" • ")}
                      </div>
                      <p className="text-gray-800 mb-2">{annonce.description}</p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="text-xl font-bold text-teal-700">
                          {annonce.price} €
                        </div>
                        <span className="text-xs text-gray-500">
                          Publié le {annonce.created_at?.slice(0, 10)}
                        </span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
