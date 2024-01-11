export function countStudents(students) {
  let list = students;
  let alumnos = [];
  let i = 0;
  while (list.length > 0) {
    let id = list[0].id_alumno
    let count = list.filter((list)=>(list.id_alumno)== id).length
      alumnos[i] = {
          id_alumno: id,
          nombre_alumno: list[0].nombre_alumno??"",
          apellido_alumno: list[0].apellido_alumno??"",
          boleta:list[0].boleta??"",
          numero_maquina:list[0].numero_maquina??"00",
          count
        };
        list = list.filter((list) => list.id_alumno !== id);
    i++;
  }
  return alumnos
}
