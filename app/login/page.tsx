"use client";
import { useState } from "react";
import NavbarWrapper from "../components/navbarWarrper";
import RegisterBtt from "../components/register";
import Footer from "../components/footer";
const url = process.env.NEXT_PUBLIC_URL;

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
      <NavbarWrapper />
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="container mx-auto px-4 py-20 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-6 text-teal-700 text-center">
            Connexion à Meuble&Co
          </h1>
          <p className="mb-8 text-lg text-gray-700 max-w-xl text-center">
            Connectez-vous pour accéder à votre espace personnel, déposer une annonce ou contacter des vendeurs.
          </p>
          <Login />
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const res = await fetch(`${url}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    let response = await res.json();
    if (response["message"] == "Login successful") {
      sessionStorage.setItem("token", response["token"]);
      window.location.href = "/";
    } else {
      alert("Email ou mot de passe incorrect");
    }
  };

  const isFormValid = Object.values(formData).every((val) => val.trim() !== "");
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-5 text-teal-700 text-center">Se connecter</h2>
      <form className="space-y-5 w-full" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-teal-200 outline-none"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700">Mot de passe</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-teal-200 outline-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className="px-6 py-3 bg-teal-600 text-white rounded-full w-full font-semibold shadow hover:bg-teal-700 transition disabled:opacity-50"
        >
          Se connecter
        </button>
      </form>
      <div className="mt-6 w-full flex flex-col items-center">
        <span className="text-gray-500 mb-2">Pas encore de compte ?</span>
        <RegisterBtt />
      </div>
    </div>
  );
}
