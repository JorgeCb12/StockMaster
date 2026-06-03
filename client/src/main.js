import { getProducts } from "./services/productos.service";
import { renderStatistics } from "./ui/inventoryStatistics";
import { renderForm, setupForm } from "./ui/renderForm";
import { renderTable, setupTable } from "./ui/renderTable";

const loadProducts = async () => {
  try {
    const products = await getProducts();
    renderTable(products);
    setupTable(loadProducts);
    renderStatistics(products);
  } catch (error) {
    console.log(`Error al cargar los productos: ${error.message} `);
  }
};

const init = async () => {
  renderForm();
  setupForm(loadProducts);
  await loadProducts();
};

init();
