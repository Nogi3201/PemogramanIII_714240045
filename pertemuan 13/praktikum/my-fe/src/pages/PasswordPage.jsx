import { useState } from "react";
import Button from "../components/atoms/Button";
import Swal from "sweetalert2";
import api from "../services/api";

export default function PasswordPage() {
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPasswordBaru, setKonfirmasiPasswordBaru] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordBaru !== konfirmasiPasswordBaru) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Konfirmasi password baru tidak cocok!",
      });
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/change-password", {
        password_lama: passwordLama,
        password_baru: passwordBaru,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Password berhasil diubah",
      });

      setPasswordLama("");
      setPasswordBaru("");
      setKonfirmasiPasswordBaru("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response?.data?.message || error.message || "Terjadi kesalahan",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-slate-800">Ubah Password</h2>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Gunakan password lama untuk membuat password baru.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Password Lama
          </label>
          <input
            type="password"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={passwordLama}
            onChange={(e) => setPasswordLama(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Password Baru
          </label>
          <input
            type="password"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={passwordBaru}
            onChange={(e) => setPasswordBaru(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Konfirmasi Password Baru
          </label>
          <input
            type="password"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={konfirmasiPasswordBaru}
            onChange={(e) => setKonfirmasiPasswordBaru(e.target.value)}
          />
        </div>
        <div className="pt-2">
          <Button type="submit" disabled={isLoading} className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            {isLoading ? "Menyimpan..." : "Ubah Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
