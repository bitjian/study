export default {
  data() {
    return {
      data: [], // 分页所有数据
      loading: false, // 是否显示加载控件
      submitLoading: false,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      isQuery: false, // 是否是查询状态，是则直接将接口数据复制给data,否则累加data
      recNo: 0, // 当前分页记录数
      params: { }, // 接口入参
      query: {}, // 查询条件
      pageSizes: [10, 50, 100], // 页码选择
      isShow: true, // 是否显示分页...
      fetchNum: 1, // 查询接口次数, 在tab切换，查询，提交表单后置为1
      getList: null, // 查询数据的接口
      findMax: 0, // 是否查找最大的记录数 1是查找最大标识， 0 是取数据给好的标识 -1 是去数组末尾的标识
      fetchSize: 100, // 接口每次获取的数据量
      listField: 'list', // 返回结果数组的字段
      recField: 'recNo', // 返回结果记录数的标识
      dataTest: {}, // 测试
      isTest: false // 是否使用测试数据
    }
  },
  computed: {
    // table的当前data
    currentData() {
      const list = this.data.slice((this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize)
      return list
    }
  },
  methods: {
    async init() {
      if (!(await this.beforeInit())) {
        return
      }
      new Promise((resolve, reject) => {
        this.loading = true
        if (this.getList instanceof Function) {
          this.getList(this.params)
            .then(data => {
              this.loading = false
              // 测试
              if (this.isTest && this.dataTest && this.dataTest.toString() !== '{}') {
                data = this.dataTest
              }
              // data = this.dataTest
              if (data.iRet === 0) {
                if (data[this.listField] && data[this.listField].length >= 0) {
                  this.data = this.data.concat(data[this.listField])
                  if (data[this.listField].length === this.fetchSize) {
                    this.isShow = true
                  } else {
                    this.isShow = false
                  }
                  if (!this.isQuery) {
                    this.total = this.total + data[this.listField].length
                    this.isQuery = true
                  } else {
                    this.total = data[this.listField].length
                  }
                  if (this.findMax === 1) {
                    data[this.listField].forEach(item => {
                      if (Number(item[this.recField]) > Number(this.recNo)) {
                        this.recNo = item[this.recField]
                      }
                    })
                  } else if (this.findMax === 0) {
                    this.recNo = data[this.recField]
                  } else {
                    this.recNo =
                    this.data[this.total - 1] &&
                    this.data[this.total - 1][this.recField]
                  }

                  this.afterInit && this.afterInit(data)
                  setTimeout(() => {
                    this.loading = false
                  }, this.time)
                  resolve(data)
                }
              } else {
                this.loading = false
                this.$notify({
                  title: '获取数据失败，请联系管理员',
                  message: data.message || '',
                  type: 'error',
                  duration: 2500
                })
              }
            })
            .catch(err => {
              this.loading = false
              reject(err)
            })
        } else {
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
    loadMore() {
      this.isQuery = false
      this.fetchNum++
      this.init()
    },
    // 每100数据查询一次，到达最后一页，则调用查询接口
    pageChange(e) {
      this.pageNo = e
      if (e === this.total / this.pageSize) {
        // this.isShow 如果已经查询到尾部，则切换pageSize，点击最后一页不会继续查询
        if (this.isShow && this.total % this.fetchSize === 0) {
          ++this.fetchNum
          this.isQuery = false
          this.init()
        }
      }
    },
    sizeChange(e) {
      this.pageNo = 1
      this.pageSize = e
      // 当切换pageSize 刚好 第一次查询的数据  fetchSize  pageSize  fetchSize 三个相等时，一般是fetchSize 为100的情况
      if (this.fetchNum === 1 && this.fetchSize === this.pageSize && this.total === this.fetchSize) {
        ++this.fetchNum
        this.isQuery = false
        this.init()
      }
    },
    toQuery(time = 200) {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.pageNo = 1
        this.pageSize = 10
        this.recNo = 0
        this.fetchNum = 1
        this.data = []
        this.isQuery = true
        this.init()
      }, time)
    },
    // 提交后重新获取表格数据,并回到提交页码
    async reFetchData() {
      this.data = []
      this.total = 0
      this.recNo = ''
      let fetchNum = this.fetchNum
      const pageNo = this.pageNo
      this.submitLoading = true
      while (fetchNum > 0) {
        await this.init()
        fetchNum--
        this.isQuery = false
      }
      // 通过current.page.sync 来保持在提交数据的页面
      this.pageNo = pageNo
      this.submitLoading = false
      this.fetchNum = 1
    }
  }
}
