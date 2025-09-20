import { roles } from "../../middleware/auth.js";

const endPoint = {
    add: [roles.User , roles.Admin],                   
    user: [roles.User],                  
    getAll: [roles.Admin],              
    updateStatus: [roles.Admin],         
    cancel: [roles.User, roles.Admin],   
};

export default endPoint;
