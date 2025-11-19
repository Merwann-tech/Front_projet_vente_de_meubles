"use client";
import NavbarWrapper from "../components/navbarWarrper";
import Footer from "../components/footer";
import UserForm from "../components/userForm";

export default function LogoutPage() {
  return (
    <div className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
      <NavbarWrapper />
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white mt-2 rounded-2xl shadow p-8 w-full max-w-sm flex flex-col items-center">
          <UserForm />
          <button
            onClick={() => {
              sessionStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="w-full px-4 py-3 bg-teal-600 text-white rounded-full font-semibold shadow hover:bg-teal-700 transition mt-6"
          >
            Se déconnecter
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
