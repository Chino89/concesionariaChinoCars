const autos = require("./autos");
const todosLosAutos = require("./autos");

const Concesionaria = {
  autos: todosLosAutos,

  buscarAuto: function (patente) {
    const autoBuscado = this.autos.find((auto) => auto.patente === patente);
    if (autoBuscado) {
      return autoBuscado;
    } else {
      return null;
    }
  },

  venderAuto: function (patente) {
    const auto = this.buscarAuto(patente);
    if (auto) {
      auto.vendido = true;
    }
  },

  autosParaLaVenta: function () {
    return autos.filter((auto) => auto.vendido === false);
  },

  autosNuevos: function () {
    const autosDisponibles = this.autosParaLaVenta();
    return autosDisponibles.filter((auto) => auto.km < 100);
  },

  listaDeVentas: function () {
    const autosVendidos = autos.filter((auto) => auto.vendido);
    return autosVendidos.map((auto) => auto.precio);
  },

  totalDeVentas: function () {
    const preciosDeVenta = this.listaDeVentas();
    if (preciosDeVenta.length > 0) {
      const ventas = preciosDeVenta.reduce(function (total, monto) {
        return total + monto;
      });
      return ventas;
    } else {
      return 0;
    }
  },

  puedeComprar: function (auto, persona) {
    return (
      auto.precio <= persona.capacidadDePagoTotal &&
      auto.precio / auto.cuotas <= persona.capacidadDePagoEnCuotas
    );
  },

  autosQuePuedeComprar: function (persona) {
    console.log("Autos para la Venta:");
    const autosParaVender = this.autosParaLaVenta();
    return autosParaVender.filter((auto) => this.puedeComprar(auto, persona));
  },
};

module.exports = Concesionaria;