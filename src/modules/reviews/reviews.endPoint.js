import { roles } from "../../middleware/auth.js";

const endPoint = {
    create: [roles.User],
}

export default endPoint 