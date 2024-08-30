import { FilterProps } from "@/Types";
import { callAPI } from "@/Utils/utils";

export const fetchTalents = async (filter: FilterProps) => {
  const { divisi, posisi } = filter;
  const endpoint = "/talents";

  return callAPI.get({
    endpoint,
    params: {
      divisi,
      posisi,
    },
  });
};

export const deleteTalent = async (talentId: string) => {
  const endpoint = `/talents/${talentId}`;

  return callAPI.delete({ endpoint });
};
