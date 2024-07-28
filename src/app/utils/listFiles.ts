import axios from "axios";

type VideosResponse = {
  resources: any[];
  next?: string;
};

export const listFiles = async (): Promise<VideosResponse> => {
  const { data } = await axios.request<VideosResponse>({
    method: "GET",
    headers: { "Content-Type": "application/json" },
    url: `/api/videos`,
  });
  return data;
};
