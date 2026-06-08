import React from "react";
import { getUser } from "../services/auth";
import Button from "../components/atoms/Button";
import Swal from "sweetalert2";
import { getToken } from "../services/auth";

export default function ProfilePage() {
  const user = getUser();

  const handleLihatToken = () => {
    const token = getToken();
    Swal.fire({
      title: "Token JWT",
      text: token || "Token tidak ditemukan",
      icon: "info",
      confirmButtonText: "Tutup",
      confirmButtonColor: "#4f46e5",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold md:text-2xl text-slate-800">Profil</h2>
          <p className="text-sm text-slate-500 mt-1">
            Informasi akun yang sedang login.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={handleLihatToken} variant="secondary" className="border border-slate-300 px-4 py-2 text-sm text-slate-700 bg-white hover:bg-slate-50 rounded-lg">
            Lihat Token
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-6">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Username
          </p>
          <p className="mt-1 text-lg font-medium text-slate-800">{user?.username || "-"}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Role
          </p>
          <p className="mt-1 text-lg font-medium text-slate-800">{user?.role || "-"}</p>
        </div>
      </div>
    </div>
  );
}
