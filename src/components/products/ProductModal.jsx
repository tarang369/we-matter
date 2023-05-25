import { useState } from 'react';
import PropTypes from 'prop-types';

const ProductModal = ({ isOpen, onClose, onSave, product }) => {
    const [title, setTitle] = useState(product ? product.title : '');
    const [category, setCategory] = useState(product ? product.category : '');
    const [price, setPrice] = useState(product ? product.price : '');
    const [description, setDescription] = useState(product ? product.description : '');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSave = () => {
        const updatedProduct = {
            id: product ? product.id : null,
            title,
            category,
            price,
            description,
        };

        onSave(updatedProduct);
    };

    return (
        <div className={`product-modal ${isOpen ? 'open' : ''}`}>
            <div className="product-modal-content">
                <h3 className='product-modal-title'>{product ? 'Edit Product' : 'Add New Product'}</h3>
                <label htmlFor="title">Title:</label>
                <input className='product-modal-input' type="text" id="title" value={title} onChange={handleTitleChange} />
                <label htmlFor="category">Category:</label>
                <input className='product-modal-input' type="text" id="category" value={category} onChange={handleCategoryChange} />
                <label htmlFor="price">Price:</label>
                <input className='product-modal-input' type="text" id="price" value={price} onChange={handlePriceChange} />
                <label htmlFor="description">Description:</label>
                <textarea className='product-modal-input' id="description" value={description} onChange={handleDescriptionChange} />
                <div className="product-modal-actions">
                    <button className='basic-button' onClick={onClose}>Cancel</button>
                    <button className='basic-button' onClick={handleSave}>{product ? 'Update' : 'Save'}</button>
                </div>
            </div>
        </div>
    );
};

ProductModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    product: PropTypes.object, // Optional if adding a new product, required if editing an existing product
};

export default ProductModal;
