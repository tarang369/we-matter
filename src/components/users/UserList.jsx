import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../features/users/usersSlice';
import UserListItem from './UserListItem';
import LoadingSpinner from '../common/LoadingSpinner';
import Pagination from '../common/Pagination';

const UserList = () => {
    const dispatch = useDispatch();
    const { list, status, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if(status === 'loading') {
        return <LoadingSpinner />;
    }

    if(status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>User List</h2>
            {list.map((user) => (
                <UserListItem key={user.id} user={user} />
            ))}
            <Pagination />
        </div>
    );
};

export default UserList;
