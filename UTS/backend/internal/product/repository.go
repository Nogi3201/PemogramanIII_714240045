package product

import (
	"gorm.io/gorm"
)

type Repository interface {
	FindAll() ([]Product, error)
	FindByID(id uint) (Product, error)
	Create(product Product) (Product, error)
	Update(product Product) (Product, error)
	Delete(id uint) error
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindAll() ([]Product, error) {
	var products []Product
	err := r.db.Find(&products).Error
	return products, err
}

func (r *repository) FindByID(id uint) (Product, error) {
	var product Product
	err := r.db.First(&product, id).Error
	return product, err
}

func (r *repository) Create(product Product) (Product, error) {
	err := r.db.Create(&product).Error
	return product, err
}

func (r *repository) Update(product Product) (Product, error) {
	err := r.db.Save(&product).Error
	return product, err
}

func (r *repository) Delete(id uint) error {
	err := r.db.Delete(&Product{}, id).Error
	return err
}
