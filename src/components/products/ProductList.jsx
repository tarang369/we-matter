import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectAllProducts, selectCategories, createNewProduct } from '../../features/products/productsSlice';
import ProductListItem from './ProductListItem';
import ProductModal from './ProductModal';
import PropTypes from 'prop-types';

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const categories = useSelector(selectCategories);

    const [newProduct, setNewProduct] = useState({
        title: '',
        category: '',
        price: '',
        description: '',
        image: '',
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    const handleAddProduct = () => {
        dispatch(createNewProduct(newProduct));
        setNewProduct({
            title: '',
            category: '',
            price: '',
            description: '',
            image: '',
        });
        setIsModalOpen(false);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryFilter = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredProducts = products.filter((product) => {
        const categoryMatch = selectedCategory === '' || product.category === selectedCategory;
        const titleMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && titleMatch;
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h2>Product List</h2>
            <div className='tools'>
                <div className="navigation-tools">
                    <div>
                        <h5>Search</h5>
                        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
                    </div>
                    <div>
                        <h5>Filter by Category</h5>
                        <select value={selectedCategory} onChange={handleCategoryFilter}>
                            <option value="">All</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <button className='basic-button' onClick={handleOpenModal}>Add Product</button>
                </div>
            </div>
            {filteredProducts.map((product) => (
                <ProductListItem key={product.id} product={product} />
            ))}

            {isModalOpen && (
                <ProductModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleAddProduct}
                    product={null}
                />
            )}
        </div>
    );
};

export default ProductList;

ProductList.propTypes = {
    products: PropTypes.array,
};
