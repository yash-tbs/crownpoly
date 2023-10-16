import { environment } from "src/environments/environment";


export class APIURL{
    //Employee Controller
    public GetEmployeeList_API_URL = environment.origin + 'Employee/GetEmployeeList';
    public GetEmployeeById_API_URL = environment.origin + 'Employee/GetEmployeeById';
    public CreateEmployee_API_URL = environment.origin + 'Employee/CreateEmployee';
    public UpdateEmployee_API_URL = environment.origin + 'Employee/UpdateEmployee';
    public DeleteEmployee_API_URL = environment.origin + 'Employee/DeleteEmployee';


    //Dropdown
    public GetDepartmentList_API_URL = environment.origin + 'Dropdown/GetDepartments';
    public GetGenderList_API_URL = environment.origin + 'Dropdown/GetGenders';
    public GetRoleList_API_URL = environment.origin + 'Dropdown/GetRoles';


    //User Controller

    

}