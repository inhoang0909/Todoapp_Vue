export const loadDonations = () => {
    const data = localStorage.getItem('donations');
    try {
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading donations from localStorage', error);
        return [];
    }
}

export const saveDonations = (donations) => {
  try {
    localStorage.setItem("donations", JSON.stringify(donations));
  } catch (error) {
    console.error('Error saving donations to localStorage', error);
  }
};