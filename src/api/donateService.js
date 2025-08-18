import api from "./api"

export const getDonations = async () => {
    const response = await api.get("");
    return response.data;
}

export const createDonation = async (donation) => {
    const response = await api.post("", donation);
    return response.data;
}   

export const deleteDonation = async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
}