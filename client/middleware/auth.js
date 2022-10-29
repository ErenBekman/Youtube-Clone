export default async function ({ app, $auth, redirect }) {
  const user = await $auth.loggedIn;
  await app.$cookies.get("auth._token.local	");
  console.log("user :>> ", user);
  if (!user) {
    return redirect("/signin");
  }
}
