import { useEffect, useState } from "react";
import { getMahasiswa } from "../services/api";

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const fetchData = () => {
    setLoading(true);
    getMahasiswa()
      .then(setMahasiswa)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

  };

  // pertama kali load
  useEffect(() => {
    fetchData();
  }, []);

  const filteredMahasiswa = mahasiswa.filter((mhs) =>
      mhs.nama.toLowerCase().includes(search.toLowerCase()) ||
      String(mhs.npm).toLowerCase().includes(search.toLowerCase()) ||
      mhs.prodi.toLowerCase().includes(search.toLowerCase())
  );
  
  if (loading) return <p className="text-center">Loading...</p>;

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-8xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Daftar Mahasiswa</h2>
      <h3 className="text-sm text-gray-600 mb-6">Total Mahasiswa : {mahasiswa.length}</h3>
              <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Cari mahasiswa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>
      <div className="overflow-hidden border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-300 border-b text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border">No</th>
              <th className="px-4 py-3 border">NPM</th>
              <th className="px-4 py-3 border">Nama / Prodi</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Alamat</th>
            </tr>
          </thead>
          <tbody className="divide-y">
                {filteredMahasiswa.length > 0 ? (
                  filteredMahasiswa.map((mhs, index) => (
                    <tr key={mhs.npm} className="hover:bg-blue-50">
                      <td className="px-4 py-3 border">{index + 1}</td>
                      <td className="px-4 py-3 border">{mhs.npm}</td>
                      <td className="px-4 py-3 border">
                        <div className="font-medium">{mhs.nama}</div>
                        <div className="text-gray-500 text-xs">{mhs.prodi}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 border">{mhs.email}</td>
                      <td className="px-4 py-3 text-gray-500 border">{mhs.alamat}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      Data tidak ditemukan 😢
                    </td>
                  </tr>
                )}
              </tbody>
        </table>
      </div>
    </div>
  );
}