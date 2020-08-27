DCache api
### getString 根据key查询value
  ``` 
  @param key的值
  ```
### getStringWithVer 根据key查询对应的结构
    @param keyItem, key的值
    ret.data = { value: 'fixed_value', ver: 2 } 
### getStringBatch  根据key查询对应的结构
 ```
 @param keyItem, key的值
 ret.data.vtValue.value =
    [
  {
    keyItem: 'a',
    value: '1',
    ret: 0,
    ver: 2,
    _classname: 'DCache.SKeyValue'
  }]
 ```
### setString 设置key-value
 ```
 @param keyItem, key的值
 @param value, 要设置的数据
 ```
### setStringBatch 批量设置key-value
    @param keyItem, key的值
    @@param value, 查询结构，返回数据
### setStringEx 设置key-value
    @param keyItem, key的值
    @param value, 要设置的数据
    @param ver，数据版本（1）
    @param dirty，是否脏数据
    @param expireTimeSecond，设置数据过期的绝对时间，以秒为单位。CacheServer将根据这个时间自动淘汰过期数据。如果数据没有过期的概念，请将此参数设为0
### delString 删除key-value
    @param keyItem, key的值