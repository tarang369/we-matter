import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById, selectProductDetails, deleteProductById } from '../../features/products/productsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductModal from './ProductModal';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const product = useSelector(selectProductDetails);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);


    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEditProduct = () => {

    }


    const handleDelete = () => {
        setIsDeleteConfirmationOpen(true);
    };

    const confirmDelete = () => {
        dispatch(deleteProductById(productId));
        navigate('/product-list'); // Redirect to the product list after deletion
    };

    if(!product) {
        return <div>Loading...</div>;
    }

    const { title, category, price, description, image } = product;

    return (
        <div className="product-details">
            <div className="product-image">
                <img src={image} alt={title} />
            </div>
            <div className="product-info">
                <h2>{title}</h2>
                <p>Category: {category}</p>
                <p>Price: {price}</p>
                <p>Description: {description}</p>
                <div className="product-buttons">
                    <button className='basic-button' onClick={handleEdit}>Edit</button>
                    <button className='basic-button' onClick={handleDelete}>Delete</button>
                </div>
            </div>
            {isEditModalOpen && (
                <ProductModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleEditProduct}
                    product={product}
                />
            )}

            {isDeleteConfirmationOpen && (
                <div className="confirmation-modal">
                    <div className="confirmation-modal-content">
                        <p>Are you sure you want to delete this product?</p>
                        <div>
                            <button className='basic-button' onClick={confirmDelete}>Yes</button>
                            <button className='basic-button' onClick={() => setIsDeleteConfirmationOpen(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

ProductDetails.propTypes = {
    productId: PropTypes.number,
};

export default ProductDetails;
