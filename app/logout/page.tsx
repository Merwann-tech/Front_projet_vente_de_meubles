"use client";
import { useState } from "react";
import NavbarWrapper from "../components/navbarWarrper";
import UserForm from "../components/userForm";
const url = process.env.NEXT_PUBLIC_URL;


export default function Home() {
    return (
        <div>
            <NavbarWrapper/>
            <div className="bg-gray-50 flex justify-center py-10">
                <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">
                    <UserForm />
                    <button
                        onClick={() => {
                            sessionStorage.removeItem("token");
                            window.location.href = "/";
                        }}
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </div>
    );
}