const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const staticMiddleware = async (req, res, next) => {
  if (req.url === '/static/banana-large.jpg') {
    await sleep(3000);
  }
  next();
};
