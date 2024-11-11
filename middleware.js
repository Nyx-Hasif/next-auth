export { default } from "next-auth/middleware";

// 
export const config = {
  matcher: ["/dashboard"]  //add path or pages that want to be protected
};
//this page wont be accessible when we are logged out