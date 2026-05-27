import { getData } from "./services/productos.service";
import { renderProduct } from "./ui/RederProducts";
import { estadisticas } from "./ui/estadisticasProductos";
import { renderData, setupData } from "./ui/renderData";

const getProducts = async () => {
  const products = await getData();

  renderProduct(products);
  estadisticas(products);
};

const init = async () => {
  renderData();
  setupData(getProducts);

  await getProducts();
};

init();
