import { useState } from "react";
const url = process.env.NEXT_PUBLIC_URL;

export default function Annonce() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    price: "",
    colors: "",
    description: "",
    materials: "",
    city: "",
  });
  const [images, setImages] = useState<FileList | null>(null);
  const [imageError, setImageError] = useState("");

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setImages(null);
      return;
    }
    if (e.target.files.length > 5) {
      setImageError("Vous pouvez ajouter jusqu'à 5 images maximum.");
      const dataTransfer = new DataTransfer();
      for (let i = 0; i < 5; i++) {
        dataTransfer.items.add(e.target.files[i]);
      }
      setImages(dataTransfer.files);
    } else {
      setImageError("");
      setImages(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images && images.length > 5) {
      setImageError("Vous pouvez ajouter jusqu'à 5 images maximum.");
      return;
    }
    setImageError("");
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (images) {
      for (let i = 0; i < images.length && i < 5; i++) {
        data.append("images", images[i]);
      }
    }
    const res = await fetch(`${url}/furnitures`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: data,
    });
    if (res.status !== 201) {
      window.location.href = "/";
      console.log(res);
    }
    let response = await res.json();
    if (response["success"] === "furniture add") {
      window.location.reload();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl mb-6 shadow transition"
      >
        <div className="px-4">Créer une annonce</div>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg relative animate-fadeIn max-h-[90vh] overflow-y-auto border border-teal-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-extrabold mb-6 text-teal-700 text-center">
              Créer une annonce
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block font-semibold mb-2 text-teal-700">
                  Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="w-full border border-teal-200 rounded-lg p-2 bg-gray-50 focus:ring focus:ring-teal-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 transition"
                />
                {imageError && (
                  <div className="text-red-600 text-sm mt-1">{imageError}</div>
                )}
                {images && images.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Array.from(images).map((file, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded"
                      >
                        {file.name}
                        <button
                          type="button"
                          className="ml-2 text-red-500 hover:text-red-700"
                          title="Supprimer cette image"
                          onClick={() => {
                            if (!images) return;
                            const dataTransfer = new DataTransfer();
                            Array.from(images).forEach((f, i) => {
                              if (i !== idx) dataTransfer.items.add(f);
                            });
                            setImages(
                              dataTransfer.files.length
                                ? dataTransfer.files
                                : null
                            );
                          }}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <label
                    htmlFor="add-image"
                    className="cursor-pointer px-3 py-1 bg-teal-50 text-teal-700 rounded text-xs hover:bg-teal-100 transition"
                  >
                    {images && images.length > 0
                      ? "Ajouter image"
                      : "Ajouter une image"}
                  </label>
                  <input
                    id="add-image"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (!e.target.files || !e.target.files[0]) return;
                      if (images && images.length >= 5) {
                        setImageError(
                          "Vous pouvez ajouter jusqu'à 5 images maximum."
                        );
                        return;
                      }
                      const dataTransfer = new DataTransfer();
                      if (images) {
                        Array.from(images).forEach((f) =>
                          dataTransfer.items.add(f)
                        );
                      }
                      dataTransfer.items.add(e.target.files[0]);
                      setImages(dataTransfer.files);
                      setImageError("");
                    }}
                  />
                  <span className="text-xs text-gray-500">
                    Jusqu'à 5 images maximum
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-teal-700 mb-1">
                    Titre
                  </label>
                  <input
                    required
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-teal-200 rounded-lg p-2 focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition bg-gray-50"
                    placeholder="Ex : Canapé en velours"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-teal-700 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border border-teal-200 rounded-lg p-2 focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition bg-gray-50"
                    rows={3}
                    placeholder="Décrivez votre meuble..."
                  />
                </div>
                <div>
                  <label className="block font-semibold text-teal-700 mb-1">
                    Type de meuble
                  </label>
                  <input
                    required
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-teal-200 rounded-lg p-2 focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition bg-gray-50"
                    placeholder="Ex : Table, Chaise, Canapé..."
                  />
                </div>
                <div>
                  <label className="block font-semibold text-teal-700 mb-1">
                    Prix
                  </label>
                  <input
                    required
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border border-teal-200 rounded-lg p-2 focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition bg-gray-50"
                    placeholder="Ex : 120"
                    min={0}
                  />
                </div>
                <div>
                  <label className="block font-semibold text-teal-700 mb-1">
                    Couleurs
                  </label>
                  <input
                    required
                    type="text"
                    name="colors"
                    value={formData.colors}
                    onChange={handleChange}
                    className="w-full border border-teal-200 rounded-lg p-2 focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition bg-gray-50"
                    placeholder="Ex : Bleu, Gris"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-teal-700 mb-1">
                    Matériaux
                  </label>
                  <input
                    required
                    type="text"
                    name="materials"
                    value={formData.materials}
                    onChange={handleChange}
                    className="w-full border border-teal-200 rounded-lg p-2 focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition bg-gray-50"
                    placeholder="Ex : Bois, Métal"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-teal-700 mb-1">
                    Ville
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-teal-200 rounded-lg p-2 focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition bg-gray-50"
                    placeholder="Ex : Paris"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setFormData({
                        type: "",
                        title: "",
                        price: "",
                        colors: "",
                        description: "",
                        materials: "",
                        city: "",
                      });
                      setImages(null);
                      setImageError("");
                    }}
                    className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium border border-gray-300 transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold shadow transition"
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
