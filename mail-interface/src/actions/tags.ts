"use server";
import { GET, fetchJson } from "@/base-api/request";
import { getCookies } from "@/utils/cookies";

export const fetchTags = async () => {
  try {
    const {
      value: { token },
    } = await getCookies();
    const {
      data: { data, meta },
    } = await fetchJson(GET("/tags", {}, token));
    return { status: "success", data, meta };
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
};
