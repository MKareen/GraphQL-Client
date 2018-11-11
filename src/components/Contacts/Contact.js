import React from 'react';
import { Link } from 'react-router-dom';

const ContactItem = ({ id, firstName, lastName, phone }) => (
    <li>
        <Link to={`/contact/${id}`}><h4>{firstName} {lastName}</h4></Link>
        <p><strong>{phone}</strong></p>
    </li>
);

export default ContactItem;
