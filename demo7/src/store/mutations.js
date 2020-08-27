export default{
        getUserInfo (state,username) {
                // 把用户登录的用户名放入缓存
                localStorage.setItem('userinfo',username)
                state.username = username
        },
         CurrentCity (state,city) {
               localStorage.setItem('cityinfo',JSON.stringify(city))
               state.city = city
         }
}