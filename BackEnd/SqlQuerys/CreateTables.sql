use [SeleMiracleRun]

Create Table Usuarios(
	Email varchar(50) check(Email Like '%@%'),
	Contrasenia varchar(20) not null,
	Roles varchar(20),
	Verificado bit,
	primary key(Email),
);

Create Table Empleado(
	Cedula varchar(15),
	Nombre varchar(15) not null,
	Apellido1 varchar(15) not null,
	Apellido2 varchar(15) not null,
	Telefono varchar(8),
	Email varchar(50) check(Email Like '%@%'),
	primary key(Cedula),
	foreign key(Email) references Usuarios(Email) on update cascade 
);

Create Table Empleador(
	Cedula varchar(15),
	Nombre varchar(15) not null,
	Apellido1 varchar(15) not null,
	Apellido2 varchar(15) not null,
	Telefono varchar(8),
	Email varchar(50) check(Email Like '%@%'),
	primary key(Cedula),
	foreign key(Email) references Usuarios(Email) on update cascade 
);

Create Table Periodo(
	Tipo varchar(30),
	primary key(Tipo)
);

Create Table Contrato(
	TipoJornada varchar(30),
	primary key(TipoJornada)
);

Create Table Proyecto(
	Nombre varchar(50),
	CedulaEmpleador varchar(15)not null,
	TipoPeriodo varchar(30)not null,
	Activo bit,
	Descripcion varchar(30),
	MontoMaximoBeneficiosEmpleado real,
	CantidadMaximaBeneficiosEmpleado tinyint,
	primary key(Nombre),
	foreign key(CedulaEmpleador) references Empleador(Cedula)on update cascade,
	foreign key(TipoPeriodo) references Periodo(Tipo)
);

Create Table DeduccionesObligatorias(
	Nombre varchar(50),
	PorcentajeEmpleador float not null,
	PorcentajeEmpleado float not null,
	primary key(Nombre)
);

Create Table HorasRegistradas(
	CedulaEmpleado varchar(15),
	NombreProyecto varchar(50),
	Cantidad tinyint not null,
	Fecha Date,
	primary key(CedulaEmpleado,NombreProyecto, Fecha),
	foreign key(CedulaEmpleado) references Empleado(Cedula)on update cascade,
	foreign key(NombreProyecto) references Proyecto(Nombre)on update cascade,
);

Create Table Beneficios(
	Nombre varchar(50),
	NombreProyecto varchar(50),
	CostoActual real not null,
  Descripción varchar(300),
	Activo bit,
	primary key(NombreProyecto,Nombre),
	foreign key(NombreProyecto) references Proyecto(Nombre) on update cascade 
);	

Create Table DeduccionesVoluntarias(
	Nombre		      varchar(50),
	NombreProyecto  varchar(50),
	Costo						real default 0,
	Descripcion			varchar(200) default '',
	Activo					bit,
	primary key(Nombre,NombreProyecto),
	foreign key(NombreProyecto) references Proyecto(Nombre) on update cascade 
);

Create Table Pago(
	ConsecutivoPago int not null IDENTITY(1,1),
	ConsecutivoPlanilla int not null,
	CedulaEmpleador varchar(15) not null,
	CedulaEmpleado varchar(15) not null,
	SalarioBruto real,
	SalarioNeto real,
	MontoTotalDeduccionesObligatoriasEmpleado real,
	MontoTotalDeduccionesObligatoriasEmpleador real,
	MontoTotalBeneficios real,
	MontoTotalDeduccionesVoluntarias real,
	primary key(ConsecutivoPago, ConsecutivoPlanilla, CedulaEmpleador),
	foreign key(ConsecutivoPlanilla) references Planilla(Consectivo),
	foreign key(CedulaEmpleador) references Empleador(Cedula)on update cascade,
	foreign key(CedulaEmpleado) references Empleado(Cedula)on update cascade,
);

Create table EmpleadoYContratoSeAsocianAProyecto(
	CedulaEmpleado varchar(15),
	TipoContrato varchar(30),
	NombreProyecto varchar(50),
	NombreServicio varchar(50),
	SalarioPorHoras float,
	FechaInicio date,
	FechaFin date,
	ValorDeServicio real,
	primary key(CedulaEmpleado,TipoContrato,NombreProyecto),
	foreign key(CedulaEmpleado) references Empleado(Cedula)on update cascade,
	foreign key(TipoContrato) references Contrato(TipoJornada),
	foreign key(NombreProyecto) references Proyecto(Nombre)on update cascade
);

Create Table BeneficioElegido(
    CedulaEmpleado varchar(15),
    NombreBeneficio varchar(50),
		NombreProyecto varchar(50),
    fechaInicio DateTime,
    fechaFin DateTime,
    primary key(CedulaEmpleado, NombreBeneficio, NombreProyecto,FechaInicio),
    foreign key(CedulaEmpleado) references Empleado(Cedula) on update cascade,
    foreign key(NombreProyecto, NombreBeneficio) references Beneficios(NombreProyecto, Nombre) on update cascade
);

Create Table DeduccionVoluntariaElegida(
    CedulaEmpleado varchar(15),
    NombreDeduccionVoluntaria varchar(50),
		NombreProyecto varchar(50),
    FechaInicio DateTime,
    FechaFin DateTime,
    primary key(CedulaEmpleado, NombreDeduccionVoluntaria, NombreProyecto,FechaInicio),
    foreign key(CedulaEmpleado) references Empleado(Cedula) on update cascade,
    foreign key(NombreDeduccionVoluntaria,NombreProyecto) references DeduccionesVoluntarias(Nombre, NombreProyecto) on update cascade
);

Create Table ContratoSujetoADeduccionesObligatorias(
	TipoJornada varchar(30),
	NombreDeduccionObligatoria varchar(50),
	primary key(TipoJornada, NombreDeduccionObligatoria),
	foreign key(TipoJornada) references Contrato(TipoJornada),
	foreign key(NombreDeduccionObligatoria) references DeduccionesObligatorias(Nombre)
);

Create Table PagoAplicaDeduccionesObligatorias(
	ConsecutivoPlanilla int,
	CedulaEmpleador varchar(15),
	ConsecutivoPago int,
	NombreDeduccionObligatoria varchar(50),
	NombreProyecto varchar(50),
	MontoEmpleador float ,
	MontoEmpleado float ,
	primary key(ConsecutivoPlanilla, CedulaEmpleador, ConsecutivoPago,NombreDeduccionObligatoria , NombreProyecto),
	foreign key(ConsecutivoPago, ConsecutivoPlanilla, CedulaEmpleador) references Pago(ConsecutivoPago, ConsecutivoPlanilla, CedulaEmpleador)on update cascade,
	foreign key( NombreDeduccionObligatoria ) references DeduccionesObligatorias (Nombre)on update cascade,
);

Create Table Planilla(
	Consectivo int not null IDENTITY(1,1),
	CedulaEmpleador varchar(15),
	FechaIncio date not null,
	FechaFin date not null,
	NombreProyecto varchar(50) not null,
	primary key(Consectivo, CedulaEmpleador),
	foreign key(CedulaEmpleador) references Empleador(Cedula) update cascade,
	foreign key(NombreProyecto) references Proyecto(Nombre) update cascade,
	);

Create Table PagoContieneBeneficios(
	ConsecutivoPlanilla int,
	CedulaEmpleador varchar(15),
	ConsecutivoPago int,
	NombreBeneficio varchar(50),
	NombreProyecto varchar(50),
	MontoBeneficio real not null,
	primary key(ConsecutivoPlanilla, CedulaEmpleador, ConsecutivoPago,NombreBeneficio , NombreProyecto),
	foreign key(ConsecutivoPago, ConsecutivoPlanilla, CedulaEmpleador) references Pago(ConsecutivoPago, ConsecutivoPlanilla, CedulaEmpleador)on update cascade,
	foreign key(NombreProyecto, NombreBeneficio) references Beneficios (NombreProyecto, Nombre)on update cascade,
);

Create Table PagoPoseeDeduccionesVoluntarias(
	ConsecutivoPlanilla int,
	CedulaEmpleador varchar(15),
	ConsecutivoPago int,
	NombreDeduccion varchar(50),
	NombreProyecto varchar(50),
	MontoDeduccion real not null,
	primary key(ConsecutivoPlanilla, CedulaEmpleador, ConsecutivoPago, NombreDeduccion, NombreProyecto),
	foreign key(ConsecutivoPago, ConsecutivoPlanilla, CedulaEmpleador) references Pago(ConsecutivoPago, ConsecutivoPlanilla, CedulaEmpleador)on update cascade,
	foreign key(NombreDeduccion,NombreProyecto) references DeduccionesVoluntarias(Nombre, NombreProyecto)on update cascade,
);


