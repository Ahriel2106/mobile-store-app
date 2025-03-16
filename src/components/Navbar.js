import React from "react";
import { AppBar, Toolbar, Button, Typography, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/useCart";

const Navbar = () => {
  const { cart } = useCart();  // Accedemos al carrito desde el contexto

  const cartQuantity = cart.length;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Catálogo de Teléfonos
        </Typography>
        <Button color="inherit" component={Link} to="/">
          <ListAltIcon sx={{ mr: 1 }} />
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartQuantity} color="error">
            <ShoppingCartIcon sx={{ mr: 1 }} />
          </Badge>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
