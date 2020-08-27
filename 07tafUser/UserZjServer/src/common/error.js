class TgError extends Error {
  constructor(err) {
    super(err.message);
    this.err = err;
  }
}

export default {
  INPUT_ERROR: () => new TgError({ iRet: -1, message: 'Input Error' }),
  DCACHE_ERROR: () => new TgError({ iRet: -2, message: 'DCache Error' }),
  NO_DATA_ERROR: () => new TgError({ iRet: -3, message: 'No Data Error' }),
  DB_ERROR: () => new TgError({ iRet: -4, message: 'DB Error' }),
  UNIID_ERROR: () => new TgError({ iRet: -5, message: 'UniId Error' }),
};
