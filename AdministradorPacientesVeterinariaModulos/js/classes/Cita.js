class Cita {
    constructor(id, nombre, propietario, telefono, fecha, hora, sintomas) {
        this.id = id;
        this.nombre = nombre;
        this.propietario = propietario;
        this.telefono = telefono;
        this.fecha = fecha;
        this.hora = hora;
        this.sintomas = sintomas;
    };

    // Método que edita las propiedades de una cita. Por parametro pasamos las nuevas propiedades que queramos que tenga la cita
    editarCita(nombre, propietario, telefono, fecha, hora, sintomas) {
        this.nombre = nombre;
        this.propietario = propietario;
        this.telefono = telefono;
        this.fecha = fecha;
        this.hora = hora;
        this.sintomas = sintomas;
    };
};

export default Cita;