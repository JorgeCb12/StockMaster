const URL_PRODUCTS = "http://localhost:3000/productos";

export const getProducts = async () => {
  const response = await fetch(URL_PRODUCTS);

  if (!response.ok) {
    throw new Error(
      `Error al obtener los productos. URL: ${URL_PRODUCTS}. Estado: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${URL_PRODUCTS}/${id}`);

  if (!response.ok) {
    throw new Error(
      `Error al obtener el producto. URL: ${URL_PRODUCTS}/${id}. Estado: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
};

// #-------------------------------------------#

export const createProduct = async (newProduct) => {
  const response = await fetch(URL_PRODUCTS, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });
  if (!response.ok) {
    throw new Error(
      `Error al crear los productos. URL: ${URL_PRODUCTS}. Estado: ${response.status} ${response.statusText}`,
    );
  }
  return await response.json();
};

// #-------------------------------------------#

export const deleteProduct = async (id) => {
  const response = await fetch(`${URL_PRODUCTS}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      `Error al eliminar el producto. URL: ${URL_PRODUCTS}/${id}. Estado: ${response.status} ${response.statusText}`,
    );
  }
};

export const updateProduct = async (id, newProduct) => {
  const response = await fetch(`${URL_PRODUCTS}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });
  if (!response.ok) {
    throw new Error(
      `Error al actualizar el producto. URL: ${URL_PRODUCTS}/${id}. Estado: ${response.status} ${response.statusText}`,
    );
  }
  return await response.json();
};
