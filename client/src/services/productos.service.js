const endpoint = "http://localhost:3000/productos";

export async function obtenerProductos() {
    try {
        const response = await fetch(endpoint);
        
        if (response.ok == false) {
            throw new Error("Error al obtener los productos");
        } else {
            return await response.json();
        }

    } catch (error) {
        console.error("Error en obtenerProductos:", error);
        throw error;
    }
};

export async function crearProducto(producto) {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto)
        });
        
        if (response.ok == false) {
            throw new Error("Error al crear el producto");
        } else {
            return await response.json();
        }
    } catch (error) {
        console.error("Error en crearProducto:", error);
        throw error;
    }
};

export async function actualizarProducto(id, producto) {
    try {
        const response = await fetch(`${endpoint}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto)
        });
        
        if (response.ok == false) {
            throw new Error("Error al actualizar el producto");
        } else {
            return await response.json();
        }
    } catch (error) {
        console.error("Error en actualizarProducto:", error);
        throw error;
    }
};

export async function actualizarParcialProducto(id, cambios) {
    try {
        const response = await fetch(`${endpoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cambios)
        });

        if (response.ok == false) {
            throw new Error("Error al actualizar parcialmente el producto");
        } else {
            return await response.json();
        }
    } catch (error) {
        console.error("Error en actualizarParcialProducto:", error);
        throw error;
    }
};

export async function eliminarProducto(id) {
    try {
        const response = await fetch(`${endpoint}/${id}`, {
            method: "DELETE"
        });
        
        if (response.ok == false) {
            throw new Error("Error al eliminar el producto");
        } else {
            return true;
        }
    } catch (error) {
        console.error("Error en eliminarProducto:", error);
        throw error;
    }
};
