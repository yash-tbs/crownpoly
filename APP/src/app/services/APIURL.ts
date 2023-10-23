import { environment } from "src/environments/environment";


export class APIURL{

    //User Controller
    public getuserList_API_URL = environment.origin + 'User/GetAllUsers';
    public getUserById_API_URL = environment.origin + 'User/GetUserById';
    public addUser_API_URL = environment.origin + 'User/AddUser';
    public updateUser_API_URL = environment.origin + 'User/UpdateUser';
    //public deleteUser_API_URL = environment.origin + 'User/DeleteUser';
    public loginUser_API_URL = environment.origin + 'User/UserLogin';

}