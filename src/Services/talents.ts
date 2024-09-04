import { ENDPOINTS } from "@/Constants";
import { FilterProps, TalentTypes } from "@/Types";
import { callAPI } from "@/Utils/utils";

export const fetchTalents = async (params: FilterProps) => {
  return callAPI.get({
    endpoint: ENDPOINTS.TALENTS.DEFAULT,
    params,
  });
};

export const deleteTalent = async (talentId: string) => {
  return callAPI.delete({
    endpoint: ENDPOINTS.TALENTS.DEFAULT + `/${talentId}`,
  });
};

export const createTalent = async (data: TalentTypes) => {
  return callAPI.post({
    endpoint: ENDPOINTS.TALENTS.DEFAULT,
    ...data,
  });
};
