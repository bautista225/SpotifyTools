import { useState } from "react";

export const CredentialsForm = ({ onSubmit }) => {
  const [clientId, setClientId] = useState(import.meta.env.VITE_CLIENT_ID);
  const [clientSecret, setClientSecret] = useState(
    import.meta.env.VITE_CLIENT_SECRET
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ clientId, clientSecret });
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    backgroundColor: "#f7f7f7",
    border: "1px solid #ddd",
    borderRadius: "8px",
    maxWidth: "400px", // Limitar el ancho máximo del contenedor
    margin: "0 auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "1rem",
  };

  const inputStyle = {
    width: "100%", // Se asegura de que los inputs ocupen el 100% del contenedor
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box", // Importante para evitar desbordamientos
  };

  const buttonStyle = {
    width: "100%", // Botón alineado al ancho del contenedor
    padding: "0.75rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#1db954", // Color similar a Spotify
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="clientId">Client ID</label>
        <input
          type="text"
          id="clientId"
          value={clientId}
          onChange={(event) => setClientId(event.target.value)}
          style={inputStyle}
          placeholder="Enter your Client ID"
        />
        <label htmlFor="clientSecret">Client Secret</label>
        <input
          type="password"
          id="clientSecret"
          value={clientSecret}
          onChange={(event) => setClientSecret(event.target.value)}
          style={inputStyle}
          placeholder="Enter your Client Secret"
        />
        <button type="submit" style={buttonStyle}>
          Log in
        </button>
      </form>
    </div>
  );
};
