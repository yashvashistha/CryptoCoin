import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++)
    pageNumbers.push(i);

  return (
    <div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <div key={number} className="page-item">
            <Link className="link" to={`/`}>
              <div
                onClick={() => paginate(number)}
                href="!#"
                className="page-link"
              >
                <span>{number}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
