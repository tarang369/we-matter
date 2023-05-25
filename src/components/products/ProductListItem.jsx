import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ProductListItem = ({ product }) => {
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div className="product-details" onClick={handleProductClick}>
            <img src={product.image} alt={product.title} className="product-icon" />
            <h5>{product.title}</h5>
        </div>
    );
};

ProductListItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProductListItem;
