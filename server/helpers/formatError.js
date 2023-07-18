import { ValidationError } from "sequelize";
import _ from "lodash";

export const formatErr = (e) => {
    if (e instanceof ValidationError) {
        return e.errors.map((err) => _.pick(err, ["path", "message"]));
    }
    return [{ path: "name", message: "Something went wrong!" }];
};