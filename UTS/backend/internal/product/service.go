package product

type Service interface {
	GetAllProducts() ([]Product, error)
	GetProductByID(id uint) (Product, error)
	CreateProduct(input Product) (Product, error)
	UpdateProduct(id uint, input Product) (Product, error)
	DeleteProduct(id uint) error
}

type service struct {
	repository Repository
}

func NewService(repository Repository) *service {
	return &service{repository}
}

func (s *service) GetAllProducts() ([]Product, error) {
	return s.repository.FindAll()
}

func (s *service) GetProductByID(id uint) (Product, error) {
	return s.repository.FindByID(id)
}

func (s *service) CreateProduct(input Product) (Product, error) {
	return s.repository.Create(input)
}

func (s *service) UpdateProduct(id uint, input Product) (Product, error) {
	product, err := s.repository.FindByID(id)
	if err != nil {
		return product, err
	}

	product.NamaBarang = input.NamaBarang
	product.Kategori = input.Kategori
	product.Deskripsi = input.Deskripsi
	product.Stok = input.Stok
	product.Harga = input.Harga
	product.Supplier = input.Supplier
	product.TanggalMasuk = input.TanggalMasuk
	product.Status = input.Status

	return s.repository.Update(product)
}

func (s *service) DeleteProduct(id uint) error {
	return s.repository.Delete(id)
}
