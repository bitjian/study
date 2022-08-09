/**
TODO:给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
你可以按任意顺序返回答案。
例1：
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
例2：
输入： nums = [3,2,4], target = 6
输出： [1,2]
例3：
输入： nums = [3,3], target = 6
输出： [0,1]
作者：掘金安东尼
链接：https://juejin.cn/post/7116656945624252430
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
**/

const getOrigin = function(arr, target) {
    for(let i = 0; i< arr.length; i++) {
      for(let j = i+1; j< arr.length; j++) {
        if(arr[i] + arr[j] === target) {
          console.log(i, j)
          return [i, j]
        }
      }
    }
}
// 通过map降低时间复杂度, 主要思路是 利用 num1 + num2 = target => target - num1 = num2
const getMapOrigin = function(arr, target) {
  const map = new Map()
  for(let i = 0; i < arr.length; i++) {
    // 去找 target - num1 = num2
    if(map.has(target - arr[i])) {
      console.log([map.get(target - arr[i]), i])
      return [map.get(target - arr[i]), i]
    }
    // 没有找到就设置 num2
    map.set(arr[i], i)
  }
}
// getOrigin([3,3], 6)

getMapOrigin([3,2,4], 6)