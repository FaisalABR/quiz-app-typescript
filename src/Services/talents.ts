import axios from "axios";

export type FilterProps = {
  divisi: string;
  posisi: string;
  query: string;
};

export const fetchTalents = async (filter: FilterProps) => {
  const { divisi, posisi } = filter;
  try {
    const res = await axios.get(
      `http://localhost:3000/talents?divisi=${divisi}&posisi=${posisi}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
