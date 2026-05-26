const EndPoint = "http://localhost:3000/productos";

export const getData = async () => {
  try {
    const response = await fetch(EndPoint);
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerProductos:", error);
    throw error;
  }
};
