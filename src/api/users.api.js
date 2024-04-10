import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://randomuser.me/",
});

export async function requestList(page, results) {
  try {
    const { data } = await axiosClient.get("api/", {
      params: { page, results, seed: "abc" },
    });
    return !data ? [] : data.results;
  } catch (error) {
    console.error("Error getList: ", error);
    return [];
  }
}
