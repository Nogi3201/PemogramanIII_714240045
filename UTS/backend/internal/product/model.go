package product

import (
	"time"
)

type Product struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	NamaBarang   string    `json:"nama_barang"`
	Kategori     string    `json:"kategori"`
	Deskripsi    string    `json:"deskripsi"`
	Stok         int       `json:"stok"`
	Harga        float64   `json:"harga"`
	Supplier     string    `json:"supplier"`
	TanggalMasuk time.Time `json:"tanggal_masuk" gorm:"type:date"`
	Status       string    `json:"status"` // e.g., "Tersedia", "Habis"
}
