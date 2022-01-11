import { createApp } from "./app";

export default context => {
  return new Promise((resovle, rejcet) => {
    const {url} = context;
    const {app, router} = createApp();

    router.push(url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      resovle(app);
    }, rejcet)
  })
}