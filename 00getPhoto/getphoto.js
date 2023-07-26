
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const { log } = require('console')
const http = require('http')
const https = require('https')
const resJson = require('./res.json')

const whiteKey = ['cookie','user-agent']
const filePath = path.join(__dirname, './getphoto.http')
class GetPhoto {
  constructor(path) {
    this.path = path
    this.headers = {}
    this.reqUrl = ''
    this.reqBody = ''
    this.ps = 0
    this.pn = 50
    this.method = 'POST'
    this.pList = []
  }
  // 解析http文件
  parseHttpObj() {
    const fileObj = fs.readFileSync(this.path,{encoding:'utf-8'}).toString()
    // 获取每一行的内容
    const fileKeyArr = fileObj.split(/\n/g)
    let jumpIndex = null
    const fileObjeKeyArr = fileKeyArr.map((item,index) => {
      if(index === 0) {
        const reqObj = item.split(/ /)
        this.method = reqObj[0].trim()
        this.reqUrl = reqObj[1].trim()
        return null
      }
      if(item === '') {
        jumpIndex = 1
        return null
      }
      if(jumpIndex) {
        this.reqBody = JSON.parse(item)
        return null
      }
      return item.split(/: /)
    }).filter(Boolean)
    fileObjeKeyArr.forEach(([key,val]) => {
      if(whiteKey.includes(key.trim())) {
        this.headers[key.trim()] = val.trim()
        }
    })
    // console.log(this.reqBody);
  }
  async getPhotos() {
    const bodyData = {...this.reqBody, ps:this.ps, pn:this.pn}
    console.log(JSON.stringify(bodyData))
    const {data} =  await axios({
      method:'POST',
      url: this.reqUrl,
      headers: this.headers,
      data: bodyData,
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true })
    }).catch(err => {
      console.log(err)
      throw new Error('axios error')
    })
    if(data.ret === 0) {
      const {data:{photolist,albuminfo}} = data
      photolist.forEach(item => {
        const photoUrl = item.photourl[0]
        this.pList.push(photoUrl.url)
      })
      this.total = albuminfo.total
      if(this.ps >= this.total) {
        try{
          fs.writeFileSync(path.join(__dirname, './photoUrl.txt'), this.pList.join(','))
        }catch(err) {
          console.log(err)
          throw new Error('写入数据失败')
        }
        return 
      }
      // this.ps = (this.ps + this.pn) > this.total ? this.total : (this.ps+this.pn)
      this.ps = (this.ps+this.pn)
      // 防止被抓
      setTimeout(async() => {
        await this.getPhotos()
      },2000)
    } else {
      throw new Error(JSON.stringify(data))
    }
  }
  async downPhoto() {
    for(const fileUrl of this.pList) {
       await axios({
          method:'get',
          url: fileUrl,
          responseType: 'stream'
       }).then(function (response) {
        response.data.pipe(fs.createWriteStream(path.join(__dirname,`./img/${new Date().valueOf()}.png`)))
      });
    }
  }
  async main() {
    this.parseHttpObj()
    await this.getPhotos()
    await this.downPhoto()
  }
}

const getphoto = new GetPhoto(filePath)
getphoto.main().then(res => {
  console.log(res)
})