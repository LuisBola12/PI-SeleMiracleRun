use [SeleMiracleRun]

Create Table Usuarios(
	Email varchar(50) check(Email Like '%@%'),
	Contrasenia varchar(20) not null,
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
	foreign key(Email) references Usuarios(Email) on update cascade on delete cascade
);

Create Table Empleador(
	Cedula varchar(15),
	Nombre varchar(15) not null,
	Apellido1 varchar(15) not null,
	Apellido2 varchar(15) not null,
	Telefono varchar(8),
	Email varchar(50) check(Email Like '%@%'),
	primary key(Cedula),
	foreign key(Email) references Usuarios(Email) on update cascade on delete cascade
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
	primary key(Nombre),
	foreign key(CedulaEmpleador) references Empleador(Cedula)on delete cascade,
	foreign key(TipoPeriodo) references Periodo(Tipo)
);
Create Table DeduccionesObligatorias(
	Nombre varchar(50),
	PorcentajeEmpleador float not null,
	PorcentajeEmpleado float not null,
	primary key(Nombre)
);
Create Table EmpleadoRegistraHorasEnProyecto(
	CedulaEmpleado varchar(15),
	NombreProyecto varchar(50),
	Cantidad tinyint not null,
	Fecha Date,
	primary key(CedulaEmpleado,NombreProyecto),
	foreign key(CedulaEmpleado) references Empleado(Cedula),
	foreign key(NombreProyecto) references Proyecto(Nombre),
);
Create Table Beneficios(
	Nombre varchar(50),
	NombreProyecto varchar(50),
	CostoActual real not null,
  Descripción varchar(300),
	primary key(NombreProyecto,Nombre),
	foreign key(NombreProyecto) references Proyecto(Nombre) on update cascade on delete cascade
);	
Create Table DeduccionesVoluntarias(
	Nombre		      varchar(50),
	NombreProyecto  varchar(50),
	Costo						real default 0,
	Descripcion			varchar(200) default '',
	primary key(Nombre,NombreProyecto),
	foreign key(NombreProyecto) references Proyecto(Nombre) on update cascade on delete cascade
);
Create Table Pago(
	NumeroConsecutivo bigint,
	CedulaEmpleador varchar(15),
	FechaYHora DateTime not null,
	NombreProyecto varchar(50) not null,
	CedulaEmpleado varchar(15) not null,
	SalarioBruto real not null,
	primary key(NumeroConsecutivo,CedulaEmpleador),
	foreign key(CedulaEmpleador) references Empleador(Cedula)on delete cascade,
	foreign key(NombreProyecto) references Proyecto(Nombre),
	foreign key(CedulaEmpleado) references Empleado(Cedula),
);
Create Table PagoContieneBeneficios(
	NumeroConsecutivo bigint,
	CedulaEmpleador varchar(15),
	NombreBeneficio varchar(50),
	NombreProyecto varchar(50),
	MontoBeneficio real not null,
	primary key(NumeroConsecutivo,CedulaEmpleador,NombreBeneficio,NombreProyecto),
	foreign key(NumeroConsecutivo,CedulaEmpleador) references Pago(NumeroConsecutivo,CedulaEmpleador)on delete cascade,
	foreign key(NombreProyecto,NombreBeneficio) references Beneficios(NombreProyecto,Nombre),
);
Create table EmpleadoYContratoSeAsocianAProyecto(
	CedulaEmpleado varchar(15),
	TipoContrato varchar(30),
	NombreProyecto varchar(50),
	NombreServicio varchar(50),
	SalarioPorHoras float,
	FechaInicio date,
	FechaFin date,
	primary key(CedulaEmpleado,TipoContrato,NombreProyecto),
	foreign key(CedulaEmpleado) references Empleado(Cedula),
	foreign key(TipoContrato) references Contrato(TipoJornada),
	foreign key(NombreProyecto) references Proyecto(Nombre)
);

Create Table EmpleadoGozaBeneficios(
    CedulaEmpleado varchar(15),
    NombreBeneficio varchar(50),
	NombreProyecto varchar(50),
    fechaInicio Date,
    fechaFin Date,
    primary key(CedulaEmpleado, NombreBeneficio, NombreProyecto),
    foreign key(CedulaEmpleado) references Empleado(Cedula),
    foreign key(NombreProyecto, NombreBeneficio) references Beneficios(NombreProyecto, Nombre) on update cascade
);

Create Table EmpleadoAplicaDeduccionesVolundarias(
    CedulaEmpleado varchar(15),
    NombreDeduccion varchar(50),
	  NombreProyecto varchar(50),
    fechaInicio Date,
    fechaFin Date,
    primary key(CedulaEmpleado, NombreDeduccion, NombreProyecto),
    foreign key(CedulaEmpleado) references Empleado(Cedula),
    foreign key(NombreProyecto, NombreDeduccion) references DeduccionesVoluntarias(NombreProyecto, Nombre) on update cascade
);


SELECT * FROM Empleado;

INSERT INTO Empleado values ('198761121','Jarod','Venegas','Alpizar','84581885','carlosSo@example.com');
INSERT INTO Empleado values ('187618721','Carlos','Solorzano','Cerdas','84589816','jarodV@example.com');

INSERT INTO Periodo values('Semanal');
INSERT INTO Periodo values('Quincenal');
INSERT INTO Periodo values('Mensual');

select * from Proyecto;
Insert into Proyecto values('Radiadores Solceri','121121121','Mensual');

Insert into EmpleadoYContratoSeAsocianAProyecto(CedulaEmpleado,TipoContrato,NombreProyecto,SalarioPorHoras,FechaInicio,FechaFin) 
values ('187612921','Medio Tiempo','Radiadores Solceri',7000,'2022-08-12','2025-05-12');


Select e.Nombre, e.Apellido1, e.Apellido2, e.Cedula,e.Email, ecp.TipoContrato from  Empleado e inner join EmpleadoYContratoSeAsocianAProyecto ecp on e.Cedula = ecp.CedulaEmpleado AND ecp.NombreProyecto = 'Radiadores Solceri';