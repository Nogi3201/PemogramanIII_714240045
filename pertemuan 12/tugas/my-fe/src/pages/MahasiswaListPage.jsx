import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/atoms/Button";
import TextInput from "../components/atoms/TextInput";
import PageTitle from "../components/molecules/PageTitle";
import MahasiswaTable from "../components/organisms/MahasiswaTable";
import { deleteMahasiswa, getMahasiswa } from "../services/api";

export default function MahasiswaListPage() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [prodiFilter, setProdiFilter] = useState("");

  const uniqueProdiList = useMemo(() => {
    const prodis = mahasiswa.map((mhs) => mhs.prodi).filter(Boolean);
    return [...new Set(prodis)].sort();
  }, [mahasiswa]);

  const filteredMahasiswa = useMemo(() => {
    let result = mahasiswa;

    if (prodiFilter) {
      result = result.filter((mhs) => mhs.prodi === prodiFilter);
    }

    const keyword = search.trim().toLowerCase();
    if (keyword) {
      result = result.filter((mhs) =>
        Object.values(mhs).some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(keyword)
        )
      );
    }

    return result;
  }, [mahasiswa, search, prodiFilter]);

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      try {
        const data = await getMahasiswa();

        if (isMounted) {
          setMahasiswa(data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError("");
      const data = await getMahasiswa();
      setMahasiswa(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (npm) => {
    const result = await Swal.fire({
      title: "Hapus data mahasiswa?",
      text: "Data yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      setError("");
      await deleteMahasiswa(npm);
      setMahasiswa((prev) => prev.filter((item) => item.npm !== npm));
      await Swal.fire({
        title: "Berhasil",
        text: "Data mahasiswa berhasil dihapus.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      setError(err.message);
      await Swal.fire({
        title: "Gagal",
        text: err.message || "Gagal menghapus data.",
        icon: "error",
        confirmButtonText: "Tutup",
      });
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-4">
      <PageTitle
        title="Daftar Mahasiswa"
        description="Kelola data mahasiswa, tambahkan, edit, dan lihat detail."
        actions={
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/">
              <Button type="button" variant="secondary">Kembali ke Dashboard</Button>
            </Link>
            <Link to="/mahasiswa/new">
              <Button type="button">Tambah Mahasiswa</Button>
            </Link>
          </div>
        }
      />

      <p className="text-sm text-gray-600">
        Total Mahasiswa:{" "}
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-semibold">
          {mahasiswa.length}
        </span>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <TextInput
            type="text"
            placeholder="Cari semua data mahasiswa..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="sm:max-w-sm"
          />
          <select
            value={prodiFilter}
            onChange={(e) => setProdiFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
          >
            <option value="">Semua Prodi</option>
            {uniqueProdiList.map((prodi) => (
              <option key={prodi} value={prodi}>
                {prodi}
              </option>
            ))}
          </select>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setSearch("");
              setProdiFilter("");
            }}
          >
            Reset
          </Button>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {error && <p className="text-sm text-red-500">Error: {error}</p>}

      <MahasiswaTable data={filteredMahasiswa} onDelete={handleDelete} />
    </div>
  );
}
