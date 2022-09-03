class Cita {
    constructor(id, paciente, propietario, telefono, fecha, hora, sintomas) {
        this.id = id;
        this.paciente = paciente;
        this.propietario = propietario;
        this.telefono = telefono;
        this.fecha = fecha;
        this.hora = hora;
        this.sintomas = sintomas;
    };

    // Método que sobreescribe las propiedades del objeto por los valores que le pasemos por parametro
    editarCita(paciente, propietario, telefono, fecha, hora, sintomas) {
        this.paciente = paciente;
        this.propietario = propietario;
        this.telefono = telefono;
        this.fecha = fecha;
        this.hora = hora;
        this.sintomas = sintomas;
    };
};

export default Cita;