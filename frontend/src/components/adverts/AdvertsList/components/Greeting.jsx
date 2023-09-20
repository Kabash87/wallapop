import { useAuth } from "../../../auth/AuthContext"

export const Greeting = ({ username }) => {
  const { isLogged } = useAuth();

  return (
    <div>
      {isLogged && username && (
        <div
          className="hidden"
          style={{
            padding: "30px",
            width: "500px",
            margin: "0 auto",
            borderRadius: "30px",
            backgroundColor: "#CEFE98",
          }}
        >
          <h5>Hola {username}, bienvenido de vuelta</h5>
        </div>
      )}
    </div>
  );
};
