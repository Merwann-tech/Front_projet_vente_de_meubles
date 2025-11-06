"use client";
import { useState } from "react";
import NavbarWrapper from "../components/navbarWarrper";
import RegisterBtt from "../components/register";
const url = process.env.NEXT_PUBLIC_URL;


export default function Home() {
  return (
    <div>
      <NavbarWrapper/>
      <Login />
    </div>
  );
}

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const res = await fetch(`${url}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    let response = await res.json()
    if (response["message"] == "Login successful") {
      sessionStorage.setItem("token", response["token"])
      window.location.href = "/"
    } else {
      alert("email ou mot de passe incorrect")
    }
  };

  const isFormValid = Object.values(formData).every((val) => val.trim() !== "");
  return (
    <div className="bg-gray-50 flex justify-center py-10">
      <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
        <form className="space-y-4 mb-2">
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block font-medium">password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="px-4 py-2 bg-[#039668] text-white rounded-lg w-full"
          >
            Envoyer
          </button>
        </form>
        <RegisterBtt />
      </div>
    </div>
  );
}