import { roles } from "../../middleware/auth.js";

const endPoint = {
    create: [roles.User],
    all:[roles.User , roles.Admin]
}

export default endPoint 