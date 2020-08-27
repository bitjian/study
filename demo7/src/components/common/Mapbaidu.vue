<template>
  <div>
        <el-autocomplete
            v-model="mapLocation.address"
            :fetch-suggestions="querySearch"
            placeholder="请输入详细地址"
            style="width: 100%"
            :trigger-on-focus="false"
            @select="handleSelect"
            />
       <div style="margin: 5px">
           <baidu-map class="bm-view" :center="mapCenter" 
                :zoom="mapZoom" :scroll-wheel-zoom="true" ak="baidu-ak"
                 @ready="handlerBMap"
         /> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapbaidu',
  data() {
    return {
      mapZoom: 15,
      mapCenter: { lng: 0, lat: 0 },
      mapLocation: {
        address: undefined,
        coordinate: undefined
      }
    }
  },
  methods: {
    handlerBMap({ BMap, map }) {
        //获取百度地图对象
      this.BMap = BMap
      this.map = map
      // 判断用户是否有搜索地址
      if (this.mapLocation.coordinate && this.mapLocation.coordinate.lng) {
          //  如果有，则获取对应地址的经纬度
        this.mapCenter.lng = this.mapLocation.coordinate.lng
        this.mapCenter.lat = this.mapLocation.coordinate.lat
        this.mapZoom = 15
        map.addOverlay(new this.BMap.Marker(this.mapLocation.coordinate))
      } else {
          //如果没有则设置初始金纬度
        this.mapCenter.lng = 113.271429
        this.mapCenter.lat = 23.135336
        this.mapZoom = 10
      }
    },
    querySearch(queryString, cb) {
        console.log(queryString, cb)
      var that = this
      //获取地址解析器
      var myGeo = new this.BMap.Geocoder()
      myGeo.getPoint(queryString, function(point) {
          //当解析器解析得出对应的经纬度时，则设置在coordinate
        if (point) {
          that.mapLocation.coordinate = point
          that.makerCenter(point)
        } else {
            // 如果获取不到都设置为空
          that.mapLocation.coordinate = null
        }
      }, this.locationCity)
      // 2. 处理搜索的结果  
      var options = {
          // 获取用户输入的地址（模糊查询）的地址 ， 例如 搜索广东省  那么就会查询出广东省汕头市 、 广东省深圳市
        onSearchComplete: function(results) {
            // 当staruts 为 0 表示有结果
          if (local.getStatus() === 0) {
            // 判断状态是否正确
            var s = []
            // 获取所有地址的真实地址以及经纬度，并存储到s对象里面
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              var x = results.getPoi(i)
              var item = { value: x.address + x.title, point: x.point }
              s.push(item)
              cb(s)
            }
          } else {
            cb()
          }
        }
      }
      // 1.执行搜索
      var local = new this.BMap.LocalSearch(this.map, options)
      local.search(queryString)
    },
    handleSelect(item) {
      var { point } = item
      this.mapLocation.coordinate = point
      this.makerCenter(point)
    },
    makerCenter(point) {
      if (this.map) {
        this.map.clearOverlays()
        this.map.addOverlay(new this.BMap.Marker(point))
        this.mapCenter.lng = point.lng
        this.mapCenter.lat = point.lat
        this.mapZoom = 15
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.bm-view 
  width: 100%;
  // height: 500px;

</style>