"use client";

import NavbarWrapper from "../components/navbarWarrper";
import Annonce from "../components/annonce";
const url = process.env.NEXT_PUBLIC_URL;

export default function UsersList() {

  return (
    <div>
      <NavbarWrapper />
      <div className="bg-gray-50 flex justify-center py-10">
        <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">
          
            <Annonce />
        </div>
      </div>
    </div>
  );
}
