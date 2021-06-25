function cipher(str) {
  const crypto = require('crypto');
  const cipher = crypto.createCipheriv('des-ecb', '12345678', '');

  /**
   * 
   * update方法
   * 第一个参数代表加密的数据
   * 第二参数代表传入数据的格式，可以是'utf8', 'ascii', 'latin1'
   * 第三个参数代表加密数据的输出格式，可以是'latin1'， 'base64' 或者 'hex'。没有执行则返回Buffer
   */
  let encrypted = cipher.update(str, 'utf8', 'hex');

      /**
       * final方法，返回任何加密的内容
       * 参数可以是'latin1', 'base64' 或者 'hex'，没有指定返回Buffer
       */
      encrypted += cipher.final('hex');
      console.log(encrypted)
}

cipher('abcd')