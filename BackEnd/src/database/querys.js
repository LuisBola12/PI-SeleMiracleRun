export const queries = {
    getAllUSers: 'Select * From Usuarios' ,
    createNewUser: "Insert into Usuarios (Email,Contrasenia) values(@Email,@Contrasenia)",
    getUserByEmail: "Select * From Usuarios Where Email = @id",
}