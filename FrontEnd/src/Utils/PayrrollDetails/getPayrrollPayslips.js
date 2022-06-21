
export const getPayrrollPayslips = async(activeProject,payrrollNumber) =>{
    const url = "http://localhost:4000/payslipsOfaProject"
    const result = await fetch(url,{
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
            Proyecto:activeProject,
            ConsecutivoPlanilla:payrrollNumber 
        }),
    });
    const newData = await result.json();
    return newData;

}