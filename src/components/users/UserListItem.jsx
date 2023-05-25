import PropTypes from 'prop-types';

const UserListItem = ({ user }) => {
    return (
        <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.address.city}</p>
        </div>
    );
};

UserListItem.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        address: PropTypes.shape({
            city: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default UserListItem;
