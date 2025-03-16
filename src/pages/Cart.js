import { useCart } from "../context/useCart";
import { Typography, Box, Grid, IconButton, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  // Calcular el precio total del carrito
  const totalPrice = cart.reduce((total, product) => total + product.basePrice, 0);

  return (
    <Box sx={{ padding: 3 }}>
      {cart.length === 0 ? (
        <Typography variant="body1">Tu carrito está vacío.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Box sx={{ border: "1px solid #ddd", borderRadius: 2, padding: 2 }}>
                  <img
                    src={product.colorOptions.find((color) => color.name === product.selectedColor)?.imageUrl}
                    alt={product.selectedColor}
                    style={{ width: "100%", height: "200px", objectFit: "contain" }}
                  />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.selectedColor} / {product.selectedStorage}GB
                  </Typography>
                  <Typography variant="body1">{product.basePrice}€</Typography>
                  <IconButton
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => removeFromCart(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" sx={{ mt: 3 }}>
            Precio total: {totalPrice}€
          </Typography>

          <Button variant="contained" sx={{ mt: 2 }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Continuar comprando
            </Link>
          </Button>
        </>
      )}
    </Box>
  );
};

export default Cart;
