import checkPermission, { parsePermission } from '@/utils/permission' // 权限判断函数

export default {
  data() {
    return {
      loading: true,
      data: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      url: '',
      params: {
        page: {
          pageNo: 1,
          pageSize: 10,
          orderField: '',
          descField: 'desc'
        }
      },
      query: {},
      time: 170,
      isAdd: false,
      getList: null,
      listField: 'list' // 返回结果数组的字段
    }
  },
  methods: {
    checkPermission,
    parsePermission,
    async init() {
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loading = true
        if (this.getList instanceof Function) {
          this.getList(this.params).then(data => {
            this.loading = false
            if (data.iRet === 0) {
              if (data[this.listField] && data[this.listField].length >= 0) {
                this.data = data[this.listField]
                this.total = data.total
                this.afterInit instanceof Function && this.afterInit(data)
                setTimeout(() => {
                  this.loading = false
                }, this.time)
                resolve(data)
              }
            } else {
              this.data = []
              this.pageNo = 1
              this.pageSize = 10
              this.total = 0
              this.loading = false
              this.$notify({
                title: '获取数据失败，请联系管理员',
                message: data.message || data.error.message || '',
                type: 'error',
                duration: 2500
              })
            }
          }).catch(err => {
            this.data = []
            this.pageNo = 1
            this.pageSize = 10
            this.total = 0
            this.loading = false
            reject(err)
          })
        } else {
          this.data = []
          this.pageNo = 1
          this.pageSize = 10
          this.total = 0
          this.loading = false
          this.$notify({
            title: '获取数据失败，请联系管理员',
            message: '数据接口错误',
            type: 'error',
            duration: 2500
          })
        }
      })
    },
    beforeInit() {
      return true
    },
    pageChange(e) {
      this.pageNo = e
      this.init()
    },
    sizeChange(e) {
      this.pageNo = 1
      this.pageSize = e
      this.init()
    },
    // 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
    dleChangePage(pageSize) {
      if (pageSize === undefined) {
        pageSize = 1
      }
      if (this.data.length === pageSize && this.pageNo !== 0) {
        this.pageNo = this.pageNo
      }
    },
    toQuery() {
      this.pageNo = 1
      this.init()
    }
  }
}
