import request from "@/utils/request";


export async function login(playload) {
  return request({
    url: "/demo/login",
    method: "POST",
    data: playload.data,
  });
}
export async function querUserList(playload) {
  return request({
    url: '/demo/queryUserList',
    method: "GET",
  });
}