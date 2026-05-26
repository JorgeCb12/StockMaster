import { getData } from "./services/productos.service";
import { renderProduct } from "./ui/RederProducts";

const getProducts = async () => {
  const products = await getData();
  console.log(products);

  renderProduct(products);
};
