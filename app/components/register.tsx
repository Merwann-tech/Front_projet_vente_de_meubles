import { UserPlus } from "lucide-react";
import React, { useState } from "react";
const url = process.env.NEXT_PUBLIC_URL;

export default function RegisterBtt() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    city: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await fetch(`${url}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.status !== 201) {
      window.location.href = "/";
    }
    let response = await res.json();
    let error = { error: "Email already exists" };
    if (response["error"] == error["error"]) {
      alert("Email déjà utilisé");
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-full shadow transition"
      >
        <UserPlus />
        S'inscrire
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-extrabold mb-6 text-teal-700 text-center">
              Inscription
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block font-medium mb-1 text-gray-700">Prénom</label>
                <input
                  required
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-teal-200"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">Nom</label>
                <input
                  required
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-teal-200"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-teal-200"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">Mot de passe</label>
                <input
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-teal-200"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">Localisation</label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-teal-200"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setFormData({
                      firstname: "",
                      lastname: "",
                      email: "",
                      password: "",
                      city: "",
                    });
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-600 text-white rounded-full font-semibold shadow hover:bg-teal-700 transition"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
