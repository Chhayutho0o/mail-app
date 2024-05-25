"use server";
import { GET, fetchJson } from "@/base-api/request";
import { getCookies } from "@/utils/cookies";

export const fetchEmails = async (params: any) => {
  try {
    const {
      value: { token },
    } = await getCookies();
    const {
      data: { data, meta },
    } = await fetchJson(GET("/mails", params, token));

    return { status: "success", data, meta };
  } catch (error: any) {
    return { status: "error", message: error.message, data: [] };
  }
};

export const fetchEmail = async (id: number) => {
  try {
    const {
      value: { token },
    } = await getCookies();
    const {
      data: { data },
    } = await fetchJson(GET(`/mails/${id}`, {}, token));
    console.log(data);
    return { status: "success", data };
  } catch (error: any) {
    console.log(error);
    return { status: "error", message: error.message, data: {} };
  }
};
