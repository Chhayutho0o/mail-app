"use server";
import { cookies } from "next/headers";

export const setCookies = async (token: string) => {
  const decodedJWT = JSON.parse(atob(token.split(".")[1]));
  const expires = decodedJWT.exp * 1000;

  cookies().set({
    name: process.env.COOKIE_NAME as string,
    value: token,
    path: "/",
    expires,
  });
};

export const getCookies = async () => {
  const cookieList = {} as any;
  const cookieName = {
    NEXT_LOCALE: "locale",
    [process.env.COOKIE_NAME as string]: "token",
  };
  (await cookies().getAll())
    .filter((item) => {
      return (
        ["NEXT_LOCALE", process.env.COOKIE_NAME as string].includes(
          item.name
        ) && item.value
      );
    })
    .map((item) => {
      cookieList[cookieName[item.name]] = item.value;
    });

  return {
    value: cookieList,
  };
};

export const removeCookie = async () => {
  cookies().delete(process.env.COOKIE_NAME as string);
};

export const getCookieLocale = () => {
  return cookies().get("NEXT_LOCALE")?.value;
};
