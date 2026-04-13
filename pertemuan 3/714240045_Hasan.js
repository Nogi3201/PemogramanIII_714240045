// Load module fs
const fs = require('fs');

// 1. LOAD DATA (baca file JSON)
const data = fs.readFileSync('data.json', 'utf-8');

// 2. DESERIALIZATION (ubah ke object)
let obj = JSON.parse(data);

// 3. MANIPULATION (WAJIB)
// Contoh:
// - tambah usia +1
// - ubah status
// - tambah properti baru

obj = obj.map(item => {
    return {
        ...item,
        usia: item.usia + 1,
        status: !item.status,
        keterangan: "Data telah diupdate"
    };
});

// 4. SERIALIZATION (ubah kembali ke JSON string)
const hasil = JSON.stringify(obj, null, 2);

// simpan ke file baru
fs.writeFileSync('hasil.json', hasil);

// tampilkan di console
console.log("Data berhasil diproses!");
console.log(hasil);