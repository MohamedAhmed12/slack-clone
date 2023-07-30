import decode from "jwt-decode";

export const getCurrentUser = () => {
    try {
        const token = localStorage.getItem("token");
        const { user } = decode(token);

        return user;
    } catch (err) {
        console.log(err);
    }
};
