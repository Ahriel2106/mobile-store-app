import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TextField, Typography, Box, Grid } from "@mui/material";

const API_URL = "https://prueba-tecnica-api-tienda-moviles.onrender.com/products";
const API_KEY = "87909682e6cd74208f41a6ef39fe4191";

const PhoneList = () => {
    const [phones, setPhones] = useState([]);
    const [filteredPhones, setFilteredPhones] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
      const fetchPhones = async () => {
              await axios.get(API_URL, {
                  headers: { "x-api-key": API_KEY }
              }).then((response) => {

// Eliminación de teléfonos duplicados por id
const uniquePhones = [
  ...new Map(response.data.map(phone => [phone.id, phone])).values()
];

// Se obtienen los primeros 20 teléfonos después de eliminar duplicados
const first20Phones = uniquePhones.slice(0, 20);

setPhones(first20Phones);
              }).catch(() => null);
  
      };
  
      fetchPhones();
  }, []);
  
    useEffect(() => {
        const filtered = phones.filter((phone) =>
            phone.name.toLowerCase().includes(search.toLowerCase()) ||
            phone.brand.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredPhones(filtered);
    }, [search, phones]); 

    return (
      <Box sx={{ padding: 3 }}>
        <TextField
          label="Buscando por marca o modelo..."
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
            '& .MuiInputLabel-root': {
              fontSize: '1rem',
            },
          }}
        />
    
        <Typography variant="body1" sx={{ mb: 3 }}>
          Resultados encontrados: {filteredPhones.length}
        </Typography>
    
        <Grid container spacing={3}>
          {filteredPhones.map((phone) => (
            <Grid item xs={12} sm={6} md={4} key={phone.id}>
              <Box
                className="card"
                sx={{
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  margin: '0 auto',
                  boxSizing: 'border-box',
                  '&:hover': {
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Link to={`/details/${phone.id}`} style={{ flex: 1 }}>
                  <img
                    src={phone.imageUrl}
                    alt={phone.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                    }}
                  />
                </Link>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {phone.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {phone.brand}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {phone.basePrice}€
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
    
};

export default PhoneList;
