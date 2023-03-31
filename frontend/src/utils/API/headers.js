const token = localStorage.getItem("accessToken");
export const headers = {
    "Content-Type": 'application/json',
    "token": `Bearer ${token}`
};