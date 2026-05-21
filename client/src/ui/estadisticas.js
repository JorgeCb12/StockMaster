export function actualizarEstadisticas(productos) {
    const totalSKU = productos.length
    const valorTotal = productos.reduce((acumulador, productoActual) => acumulador + (productoActual.precioUnidad * productoActual.stock), 0)
    const stockCritico = productos.filter(productoActual => productoActual.stock < 5).length

    document.getElementById("stat-total").textContent = totalSKU
    document.getElementById("stat-value").textContent = `COP ${valorTotal.toLocaleString()}`
    document.getElementById("stat-low").textContent = stockCritico
}
