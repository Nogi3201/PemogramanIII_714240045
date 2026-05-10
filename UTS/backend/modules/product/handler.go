package product

import (
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/user/warehouse/utils"
)

type Handler struct {
	service Service
}

func NewHandler(service Service) *Handler {
	return &Handler{service}
}

func (h *Handler) GetAll(c *fiber.Ctx) error {
	products, err := h.service.GetAllProducts()
	if err != nil {
		return utils.ErrorResponse(c, fiber.StatusInternalServerError, err.Error())
	}
	return utils.SuccessResponse(c, fiber.StatusOK, "Berhasil mengambil semua data barang", products)
}

func (h *Handler) GetByID(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, "ID tidak valid")
	}

	product, err := h.service.GetProductByID(uint(id))
	if err != nil {
		return utils.ErrorResponse(c, fiber.StatusNotFound, "Barang tidak ditemukan")
	}

	return utils.SuccessResponse(c, fiber.StatusOK, "Berhasil mengambil detail barang", product)
}

func (h *Handler) Create(c *fiber.Ctx) error {
	var input Product
	if err := c.BodyParser(&input); err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, "Format input tidak valid")
	}

	// Validasi input
	if err := validateProduct(input); err != "" {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, err)
	}

	product, err := h.service.CreateProduct(input)
	if err != nil {
		return utils.ErrorResponse(c, fiber.StatusInternalServerError, err.Error())
	}

	return utils.SuccessResponse(c, fiber.StatusCreated, "Barang berhasil ditambahkan", product)
}

func (h *Handler) Update(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, "ID tidak valid")
	}

	var input Product
	if err := c.BodyParser(&input); err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, "Format input tidak valid")
	}

	// Validasi input
	if err := validateProduct(input); err != "" {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, err)
	}

	product, err := h.service.UpdateProduct(uint(id), input)
	if err != nil {
		return utils.ErrorResponse(c, fiber.StatusInternalServerError, err.Error())
	}

	return utils.SuccessResponse(c, fiber.StatusOK, "Barang berhasil diperbarui", product)
}

func (h *Handler) Delete(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, "ID tidak valid")
	}

	err = h.service.DeleteProduct(uint(id))
	if err != nil {
		return utils.ErrorResponse(c, fiber.StatusInternalServerError, err.Error())
	}

	return utils.SuccessResponse(c, fiber.StatusOK, "Barang berhasil dihapus", nil)
}

// Custom manual validation for product
func validateProduct(input Product) string {
	if strings.TrimSpace(input.NamaBarang) == "" {
		return "Nama barang wajib diisi"
	}
	if strings.TrimSpace(input.Kategori) == "" {
		return "Kategori wajib diisi"
	}
	if strings.TrimSpace(input.Supplier) == "" {
		return "Supplier wajib diisi"
	}
	if input.Stok < 0 {
		return "Stok tidak boleh bernilai negatif"
	}
	if input.Harga < 0 {
		return "Harga tidak boleh bernilai negatif"
	}
	return ""
}
