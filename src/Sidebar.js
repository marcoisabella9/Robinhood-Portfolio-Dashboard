import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside>
            <ul>
                <li><Link to="/maincontent">Overview</Link></li>
                <li><Link to="/transactions">Transactions</Link></li>
                <li><Link to="/trade">Trade</Link></li>
                <li><Link to="/view-stock">View Stock</Link></li>
            </ul>
        </aside>
    );
};

export default Sidebar;