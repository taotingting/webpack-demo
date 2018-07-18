# webpack-demo
来源：https://github.com/ruanyf/webpack-demos

# 创建项目
1. 创建一个webpack-demo 的文件夹
2. cd webpack-demo
3. 全局安装 npm init -y  (创建package.json)
4. npm i -g webpack webpack-dev-server(没有权限的话要加上sudo)  

# 创建第一个demo: demo1 
1. 新建一个demo1 文件夹 cd demo1
2. npm init  默认默认默认(cd .. 返回上一层目录)
3. npm run dev 报错:
-   第一个错误：  

```
dst69383:demo2 ttt$ npm run dev
npm ERR! missing script: dev
```
修改package.json(是需要自己自定义脚本的！)

```
{
  "name": "demo1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {}
}

```
修改后

```
{
  "name": "demo1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server --open",
    "build": "webpack -p"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {}
}

```
-   第二个错误：

```
dst69383:demo2 ttt$ npm run dev

> demo2@1.0.0 dev /Users/ttt/Desktop/webpack-demo/demo2
> webpack-dev-server --open

The CLI moved into a separate package: webpack-cli.
Please install 'webpack-cli' in addition to webpack itself to use the CLI.
-> When using npm: npm install webpack-cli -D
-> When using yarn: yarn add webpack-cli -D
module.js:549
    throw err;
    ^

```
安装npm install webpack-cli -D(webpack 4+以上要安装webpack-cli)

-   第三个错误：npm run dev依然报错  

    然后接着安装 cnpm i webpack-dev-server -D  npm i -g webpack -D
    
    终于可以跑起来了

==**这里有个问题，问什么要每个demo都安装一遍依赖 不懂！！！！！ 例子不是外层文件安装就好了吗**==

# demo5 Image loader
1. 报错 ：
    - 复制文件夹demo4后重新安装依赖 一直无法下载url-loader

    - 多次之后只好删除依赖 重新npm init 好了。。。。



2. 报错： Cannot read property 'appendChild' of null
    ```
    var img1=document.createElement('img');
    img1.src='./img/img1.jpg'
    document.body.appendChild(img1)
    
    var img2=document.createElement('img');
    img2.src=require('./img/img2.jpg')
    document.body.appendChild(img2)
    ```
   
解决方法是 把script放到body后面

```
<!doctype html>
<html>
  <head>
    <title></title>
    <script type="text/javascript" src="bundle.js"></script>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>


</html>
```

```
<!doctype html>
<html>
  <head>
    <title></title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
  <script type="text/javascript" src="bundle.js"></script>

</html>
```

3. 报错 Cannot find module 'file-loader'
不是说url-loader 包含了file-loader吗还要安装一次吗。。。。

```
ERROR in ./img/img2.jpg
Module build failed (from ./node_modules/url-loader/dist/cjs.js):
Error: Cannot find module 'file-loader'
    at Function.Module._resolveFilename (module.js:547:15)
    at Function.Module._load (module.js:474:25)
    at Module.require (module.js:596:17)
    at require (internal/module.js:11:18)
    at Object.loader (/Users/ttt/Desktop/webpack-demo/demo5/node_modules/url-loader/dist/index.js:59:20)
 @ ./main.js 6:9-34
 @ multi (webpack)-dev-server/client?http://localhost:8080 ./main.js
```
4. warning 加上--mode development就好了
 
```
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
```

```
  "scripts": {
    "dev": "webpack-dev-server --open --mode development",
    "build": "webpack -p"
  },
```
5. 报错 找了好久 原来是我依赖下错了  安装成了  file-url
 永远相信复制粘贴 不要相信自己手动输入

```
ERROR in ./main.js
Module not found: Error: Can't resolve 'file-loader' in '/Users/ttt/Desktop/webpack-demo/demo5'
 @ ./main.js 6:9-34
 @ multi (webpack)-dev-server/client?http://localhost:8080 ./main.js
```

6. 有一个疑问 两项都不配就报错 但是随便配置哪一样都不报错 可是不下file-loader也报错
然后remove url-loader 功能正常 所以为什么不一开始直接用file-loader？？？？？？感觉file-loader已经包含了url-loader了吗？？？？？？

```
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            // {
            //   loader: 'url-loader',
            //   options: {
            //     limit: 8192
            //   }
            // },
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        },
      ]
    }
```


# demo6 css module
配置后不报错  但是样式没生效 没取到感觉

```
<html>
<head>
    <title></title>
  <style type="text/css">._1CFy6WMYvnHUT4C_VOUFly{
    background:green;
}</style></head>
  <body huaban_collector_injected="true">
    <h1>Hello World</h1>
  
  <script type="text/javascript" src="bundle.js"></script><h2 class="[object Object]"></h2>

<div id="cli_dialog_div"></div>
</body>
</html>
```

```
      {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
               loader: 'css-loader',
               options: {
                 modules: true
               }
            }
          ]
        }
```
找到原因， h2.className=style.title 一开始写的是
 h2.className=style 是一个dom对象
```
 var h2= document.createElement('h2')
 h2.className=style.title 
 h2.innerHTML='redredred'
 document.body.appendChild(h2)
```

配置里需要加上modules: true
```
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
               loader: 'css-loader',
               options: {
                 modules: true
               }
            }
          ]
        }
```

**==关于css module单独学一下总结
http://www.ruanyifeng.com/blog/2016/06/css_modules.html  
https://github.com/css-modules/webpack-demo==**

