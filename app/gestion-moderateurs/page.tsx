"use client";
import { useEffect, useState } from "react";
import UsersCard from "../components/userCard";
import NavbarWrapper from "../components/navbarWarrper";
import Footer from "../components/footer";
import Authorization from "../lib/auth";
const url = process.env.NEXT_PUBLIC_URL;

export default function UsersList() {
  const [searchName, setSearchName] = useState("");

  return (
    <div className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
      <NavbarWrapper />
      <Authorization minRole="admin">
        <main className="flex-1 flex justify-center items-center py-10">
          <section className="w-full max-w-md bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-teal-700 text-center">
              Gestion des modérateurs
            </h2>
            <input
              type="text"
              placeholder="Rechercher un.e bénévole"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
            />
            <UsersCard name={searchName} />
          </section>
        </main>
      </Authorization>
      <Footer />
    </div>
  );
}
