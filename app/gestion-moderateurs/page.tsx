"use client";
import { useEffect, useState } from "react";
import UsersCard from "../components/userCard";
import NavbarWrapper from "../components/navbarWarrper";
const url = process.env.NEXT_PUBLIC_URL;

export default function UsersList() {
  const [searchName, setSearchName] = useState("");

  return (
    <div>
      <NavbarWrapper />
      <div className="bg-gray-50 flex justify-center py-10">
        <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-center">
            Gestion des modérateurs
          </h2>
          <input
            type="text"
            placeholder="Rechercher un.e bénévole"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
          />
          <UsersCard name={searchName} />
        </div>
      </div>
    </div>
  );
}
