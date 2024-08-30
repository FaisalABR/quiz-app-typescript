import { FilterProps } from "@/Types";
import { callAPI } from "@/Utils/utils";

const ROOT_API = import.meta.env.VITE_LOCAL_API;

export const fetchTalents = async (filter: FilterProps) => {
  const { divisi, posisi } = filter;
  const url = `${ROOT_API}/talents`;

  return callAPI({
    url,
    method: "GET",
    params: {
      divisi,
      posisi,
    },
  });
};

export const deleteTalent = async (talentId: string) => {
  const url = `${ROOT_API}/talents/${talentId}`;

  return callAPI({ url, method: "DELETE" });
};
