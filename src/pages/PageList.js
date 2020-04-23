import React from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Page() {
  const [pages, setPages] = React.useState([]);

  const fetchData = () => {
    api.get(`/pages`).then((response) => {
      setPages(response.data);
    });
  };

  React.useEffect(fetchData, []);

  return (
    <div>
      {pages.map((page) => (
        <Link to={`/${page.id}`} key={page.id}>
          {page.name}
        </Link>
      ))}
    </div>
  );
}

export default Page;
