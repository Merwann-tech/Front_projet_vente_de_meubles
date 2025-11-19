"use client";
import { useEffect, useState } from "react";
const url = process.env.NEXT_PUBLIC_URL;

export default function UserForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    city: "",
  });
  const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  useEffect(() => {
    fetch(`${url}/users/token`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      if (response.status !== 200) {
        window.location.href = "/";
      } else {
        const data = await response.json();
        setFormData({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          email: data.email || "",
          password: "",
          city: data.city || "",
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await fetch(`${url}/users/token`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    if (res.status !== 200) {
      window.location.href = "/";
    }
    let response = await res.json();
    let error = { error: "L'email existe déjà" };
    if (response["error"] == error["error"]) {
      alert("Email déjà utilisé");
    } else {
      window.location.reload();
      alert("Informations mises à jour !");
    }
  };

 return (
  <div className="w-full max-w-sm">
    <h2 className="text-2xl font-extrabold mb-6 text-teal-700 text-center">
      Éditer mes informations
    </h2>
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block font-medium mb-1 text-gray-700">Prénom</label>
        <input
          required
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-200 outline-none transition"
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
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-200 outline-none transition"
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
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-200 outline-none transition"
        />
      </div>
      <div>
        <label className="block font-medium mb-1 text-gray-700">Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-200 outline-none transition"
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
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-200 outline-none transition"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-3 bg-teal-600 text-white rounded-full font-semibold shadow hover:bg-teal-700 transition"
      >
        Mettre à jour
      </button>
    </form>
  </div>
);
}
