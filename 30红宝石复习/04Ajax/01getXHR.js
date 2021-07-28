function getXHR() {
  let xhr = null
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  }else if(window.ActiveXObject) {
    try {
      xhr = new ActiveXObject('Msxml2.XMLHTTP')
    }catch(err) {
      try {
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }catch(err) {
        alert(err+'你浏览器不支持 Ajax')
      }
    }
  }
}

function ajax(url,method) {
  let xhr = getXHR()
  xhr.onreadystatechange = function() {
    console.log('xr.readyState:'+this.readyState);
  }
  xhr.onloadstart = function() {
    console.log('onloadStart');
  }
  xhr.onload = function() {
    console.log('onload');
  }
  xhr.open(method,url,true)
  xhr.setRequestHeader('Cache-Control', 3600)
  xhr.send()
}