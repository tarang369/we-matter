import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const UserChart = () => {
    const data = {
        labels: ['Location 1', 'Location 2', 'Location 3'],
        datasets: [
            {
                data: [30, 40, 30],
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
            },
        ],
    };

    return (
        <div>
            <h2>User Chart</h2>
            <Pie data={data} />
        </div>
    );
};

UserChart.propTypes = {
    data: PropTypes.object,
};

export default UserChart;
