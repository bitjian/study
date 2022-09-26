import request from '../proxy';


export default {
  async post(req, res) {
    try {
      if (!req.body.data.basicInfo) {
        req.body.data.basicInfo = {};
      }
      req.body.data.basicInfo.token = req.user ? req.user.username : '';
      const response = await request(req.body, req.headers.traceid);
      res.json(response);
    } catch (error) {
      res.send(error);
    }
  },
};
