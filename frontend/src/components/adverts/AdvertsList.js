import { useEffect, useState } from "react";
import axios from "axios";

const AdvertsList = () => {
  //TODO: dispatch to props
  const [adverts, setAdverts] = useState([]);

  //TODO: mover llamada a API a un componente
  useEffect(() => {
    axios.get("http://localhost:4000/api/adverts").then((response) => {
      setAdverts(response.data.results);
    });
  }, []);
  return (
    <div className="AdvertsList">
      <h1>Hello ducks!</h1>
      <ul>
        {adverts.map((advert) => (
          <li key={advert.id}>
            {advert.name}
            {advert.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvertsList;
