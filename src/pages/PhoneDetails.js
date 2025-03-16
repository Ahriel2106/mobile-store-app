import React, { useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button, Select, MenuItem, FormControl, InputLabel, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { useCart } from "../context/useCart";

const API_URL = "https://prueba-tecnica-api-tienda-moviles.onrender.com/products";
const API_KEY = "87909682e6cd74208f41a6ef39fe4191";

const PhoneDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();  // Aquí usamos el hook para añadir al carrito
  const [phone, setPhone] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoneDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          headers: { "x-api-key": API_KEY },
        });
        setPhone(response.data);
        console.log("RES: ", response.data)
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchPhoneDetails();
  }, [id]);

  if (loading) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  if (!phone) {
    return <Typography variant="h6">No se pudo encontrar el teléfono.</Typography>;
  }

  // Función para manejar la selección de almacenamiento
  const handleStorageChange = (e) => {
    setSelectedStorage(e.target.value);
  };

  // Función para manejar la selección de color
  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  // Verificar si se han seleccionado color y almacenamiento antes de permitir añadir al carrito
  const isAddToCartEnabled = selectedColor && selectedStorage;

  // Función para añadir al carrito con las especificaciones seleccionadas
  const handleAddToCart = () => {
    const selectedStorageOption = phone.storageOptions?.find(
      (storage) => storage.capacity === selectedStorage
    );

    // El precio final será el de la opción seleccionada, o el precio base si no hay opciones
    const finalPrice = selectedStorageOption ? selectedStorageOption.price : phone.basePrice;

    const productToAdd = {
      ...phone,
      selectedColor,
      selectedStorage,
      basePrice: finalPrice,
    };

    addToCart(productToAdd);
  };

  // Calcular el precio final basado en las opciones seleccionadas
  const selectedStorageOption = phone.storageOptions?.find(
    (storage) => storage.capacity === selectedStorage
  );
  const totalPrice = selectedStorageOption ? selectedStorageOption.price : phone.basePrice;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">{phone.name}</Typography>
      <Typography variant="h6" color="textSecondary">
        {phone.brand}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        {selectedColor && (
          <img
            src={phone.colorOptions.find((color) => color.name === selectedColor)?.imageUrl}
            alt={selectedColor}
            style={{
              width: "300px",
              height: "auto",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        )}
      </Box>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Color</InputLabel>
        <Select value={selectedColor} onChange={handleColorChange} label="Color">
          {phone.colorOptions?.map((color) => (
            <MenuItem key={color.name} value={color.name}>
              {color.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Almacenamiento</InputLabel>
        <Select
          value={selectedStorage}
          onChange={handleStorageChange}
          label="Almacenamiento"
        >
          {phone.storageOptions?.map((storage) => (
            <MenuItem key={storage.capacity} value={storage.capacity}>
              {storage.capacity}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ my: 3 }}>
  <Typography variant="h6">Especificaciones</Typography>
  
  {phone.specs.screen && (
    <Typography>
      <strong>Pantalla:</strong> {phone.specs.screen.replace(" (información no disponible en el HTML)", "")}
    </Typography>
  )}

  {phone.specs.resolution && (
    <Typography>
      <strong>Resolución:</strong> {phone.specs.resolution.replace(" (información no disponible en el HTML)", "")}
    </Typography>
  )}

  {phone.specs.processor && (
    <Typography>
      <strong>Procesador:</strong> {phone.specs.processor.replace(" (información no disponible en el HTML)", "")}
    </Typography>
  )}

  {phone.specs.mainCamera && (
    <Typography>
      <strong>Cámara Principal:</strong> {phone.specs.mainCamera.replace(" (información no disponible en el HTML)", "")}
    </Typography>
  )}

  {phone.specs.selfieCamera && (
    <Typography>
      <strong>Cámara Selfie:</strong> {phone.specs.selfieCamera.replace(" (información no disponible en el HTML)", "")}
    </Typography>
  )}

  {phone.specs.battery && (
    <Typography>
      <strong>Batería:</strong> {phone.specs.battery.replace(" (información no disponible en el HTML)", "")}
    </Typography>
  )}

  {phone.specs.os && (
    <Typography>
      <strong>OS:</strong> {phone.specs.os.replace(" (información no disponible en el HTML)", "")}
    </Typography>
  )}

  {phone.specs.screenRefreshRate && (
    <Typography>
      <strong>Frecuencia de pantalla:</strong> {phone.specs.screenRefreshRate.replace(" (información no disponible en el HTML)", "")}
    </Typography>
  )}

  {phone.description && (
    <Typography>
      <strong>Descripción:</strong> {phone.description.replace(" (información no disponible en el HTML)", "")}
    </Typography>
  )}

  {phone.basePrice !== undefined && (
    <Typography>
      <strong>Precio base:</strong> {phone.basePrice}€
    </Typography>
  )}
</Box>




      <Typography variant="h6" sx={{ mt: 3 }}>
        Precio total: {totalPrice}€
      </Typography>

      <Button
        variant="contained"
        disabled={!isAddToCartEnabled}
        sx={{ mt: 2 }}
        onClick={handleAddToCart}
      >
        Añadir al carrito
      </Button>
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>Productos Similares</Typography>
      <Grid container spacing={1} justifyContent="center">
      {phone.similarProducts.length > 0 ? (
  [...new Map(phone.similarProducts.map(item => [item.id, item])).values()].map((similar) => (
    <Grid item key={similar.id} xs={12} sm={4} md={3} lg={2}>
      <Card
        sx={{
          maxWidth: 160,
          height: "auto",
          cursor: "pointer",
          textAlign: "center",
          boxShadow: 2,
          borderRadius: 2,
        }}
        onClick={() => navigate(`/details/${similar.id}`)}
      >
        <CardMedia
          component="img"
          sx={{
            height: 140,
            width: "100%",
            objectFit: "contain",
            padding: "8px",
          }}
          image={similar.imageUrl}
          alt={similar.name}
        />
        <CardContent sx={{ padding: "6px" }}>
          <Typography variant="body2" fontWeight="bold">
            {similar.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {similar.basePrice}€
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))
) : (
  <Typography variant="body2" color="text.secondary">
    No se encontraron productos similares.
  </Typography>
)}

</Grid>


    </Box>
  );
};

export default PhoneDetails;
