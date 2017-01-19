var src = './src',
    dest = './dist';
    
module.exports = {
  options:{
    string: 'env',
    default: { env: process.env.NODE_ENV || 'development' }
  },
  less:{
    all:src+"/less/**/*.less",
    src:src+"/less/*.less",
    dest:dest+"/css",
    settings:{}
  },
  javascript:{
    all:src+"/javascript/**/*.js",
    src:src+"/javascript/**/*.js",
    dest:dest+"/javascript",
    settings:{}
  },
  html:{
    all:src+"/html/**/*.html",
    src:src+"/html/*.html",
    dest:dest+"/html",
    settings:{
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    }
  },
  images:{
    all:src+"/images/**/*",
    src:src+"/images/**/*",
    dest:dest+"/images",
    settings:{}
  },
  icon:{
    all:src+"/images/icon/*",
    src:src+"/images/icon/*",
    dest:dest+"/images/icon",
    settings:{}
  },
  iconfont:{
    all:src+"/iconfont/*",
    src:src+"/iconfont/*",
    dest:dest+"/iconfont",
    settings:{}
  },
  manifest:{
    all:"./gulp/manifest.json",
    src:"./gulp/manifest.json",
    dest:"",
    settings:{}
  }
}
