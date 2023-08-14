import { useEffect, useState } from "react";
import { getLatestAdverts } from "./service";

const AdvertsList = () => {
  //TODO: dispatch to props
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    // toma la lista de anuncios del backend por axios
    getLatestAdverts().then((adverts) => {
      setAdverts(adverts);
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
