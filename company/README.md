# efe-workflow
基于parcel打包的活动开发工作流程模板

## 安装配置&特殊说明
- 全局安装parcel：`npm install -g parcel-bundler`
- 全局安装rimraf，让build操作时能先清空dist目录：`npm i rimraf -g`
- 修改配置：`efe-config`
- 修改package.json：`cdn前缀`**（只需要修改“cdn前缀”，如果后面附带/pc、/mobile不要删）**，本次活动cdn的前缀路径，打包时会把这个前缀添加到js、css、images资源前
- 所有源代码的修改都要在src目录内完成，如果初始化开发项目时没有src麻烦手动创建
- 不经过parcel打包但是又需要放到ftp服务器的文件统一放在public目录中，src/public，src/mb/public，src/pc/public
- `npm run dev:two`，链接还是单端开发的链接，控制台只显示mb的链接，pc的链接为mb链接的端口-1


## 开发目录规范
### 不分pc mb
- src
  - js
  - images
  - css
  - fonts
  - video
  - audio
  - html 文件
  - public ———— 不经过parcel打包但是又需要放到ftp服务器的文件统一放在这里
- dist 
  - js
  - images
  - css
  - fonts
  - video
  - audio
  - html 文件
  - public ———— 不经过parcel打包但是又需要放到ftp服务器的文件统一放在这里

### 区分pc mb两个目录
- src
  - pc
    - js
    - images
    - css
    - fonts
    - video
    - audio
    - html 文件
    - public ———— 不经过parcel打包但是又需要放到ftp服务器的文件统一放在这里
  - mb
    - js
    - images
    - css
    - fonts
    - video
    - audio
    - html 文件
    - public ———— 不经过parcel打包但是又需要放到ftp服务器的文件统一放在这里
- dist 
  - pc
    - js
    - images
    - css
    - fonts
    - video
    - audio
    - html 文件
    - public ———— 不经过parcel打包但是又需要放到ftp服务器的文件统一放在这里
  - mobile
    - js
    - images
    - css
    - fonts
    - video
    - audio
    - html 文件
    - public ———— 不经过parcel打包但是又需要放到ftp服务器的文件统一放在这里

## npm命令说明

### 命令组合
npm run 动词:设备/端-[前缀修饰]-[环境]

### 命令解读
#### 动词
- 开发：dev
- 打包：build
- 上传到ftp静态服务器：ftp
- 打包并部署到ftp静态服务器：deploy

#### 设备/端
**分pc mb 两个目录开发才需要，一套代码时不需要**
- pc&mb：two
- pc端：pc
- mb端：mb

#### 前缀修饰
- 以cdn前缀打包：cdn
  
#### 环境
- 预发布：pre
- 正式：online
- 正式&预发布：all

### 命令使用技巧推荐
- `ctrl + shift + p`，选择`Tasks:Run Task`，（如果vscode汉化了则自行翻译）
- 选择 npm，然后根据自己的需求输入筛选，选择自己想要的命令
- 如选择Configure Tasks，可配置常用的命令，不懂的自己百度

### 以cdn前缀打包部署到ftp服务器步骤说明
- 修改package.json的 “CDN前缀” 为cdn链接前缀（**（只需要修改“cdn前缀”，如果后面附带/pc、/mobile不要删）**），如：https://xxxxxx/res_eu/acticity/krpf/pfPre
- 运行`build-cdn`相关的命令，以cdn链接前缀打包资源
- 运行 `npm run cdn` 这个命令 把静态资源上到cdn
- 等待cdn资源生效之后，`ftp` 相关的命令，把打包之后的dist目录资源都放上cdn

### 命令说明大全

#### 公共
- `cdn`:把dist目录内的静态资源（除开.html,.md）更新到cdn上
- `clean`: 清空dist 目录

#### 分pc\mb两个目录开发
- `dev:two`: pc\mb 两个目录一起开发
  - 链接还是单端开发的链接，控制台只显示mb的链接，pc的链接为mb链接的端口-1
- `dev:pc`: 开发pc目录
- `dev:mb`: 开发mb目录
- `build:pc`: 打包pc目录
- `build:mb`: 打包mb目录
- `build:pc-cdn`: 以cdn前缀打包pc目录
- `build:mb-cdn`: 以cdn前缀打包mb目录
- `build:two-cdn`: 以cdn前缀打包pc&mb目录
- `ftp:pc-online`: 更新pc正式环境
- `ftp:mb-online`: 更新mb正式环境
- `ftp:two-online`: 更新pc&mb正式环境
- `ftp:pc-pre`: 更新pc预发布
- `ftp:mb-pre`: 更新mb预发布
- `ftp:two-pre`: 更新pc&mb 预发布
- `ftp:two-all`: 更新pc&mb 预发布&正式
- `deploy:two-all`: 打包pc&mb代码——> 更新到预发布&正式
- `deploy:two-pre`: 打包pc&mb代码——> 更新到预发布
- `deploy:two-online`: 打包pc&mb代码——> 更新到正式
- `deploy:pc-pre`: 打包pc代码——> 更新pc预发布
- `deploy:pc-online`: 打包pc代码——> 更新pc正式
- `deploy:mb-pre`: 打包mb代码——> 更新mb预发布
- `deploy:mb-online`: 打包mb代码——> 更新mb正式
- `deploy:two-cdn-all`: 以cdn前缀打包pc&mb代码——> 更新到pc&mb预发布&正式
- `deploy:two-cdn-pre`: 以cdn前缀打包pc&mb代码——> 更新到pc&mb预发布
- `deploy:two-cdn-online`: 以cdn前缀打包pc&mb代码——> 更新到pc&mb正式
- `deploy:pc-cdn-pre`: 以cdn前缀打包pc代码——> 更新pc预发布
- `deploy:pc-cdn-online`: 以cdn前缀打包pc代码——> 更新pc正式
- `deploy:mb-cdn-pre`: 以cdn前缀打包mb代码——> 更新mb预发布
- `deploy:mb-cdn-online`: 以cdn前缀打包mb代码——> 更新mb预发布

#### 不分pc/mb目录开发
- `dev`: 开发
- `build`: 打包
- `build:cdn`: 以cdn前缀打包代码
- `ftp:pre`: 更新到预发布
- `ftp:all`: 更新到正式&预发布
- `deploy:all`: 打包——>更新到正式&预发布
- `deploy:pre`: 打包——>更新到预发布
- `deploy:online`: 打包——>更新到正式
- `deploy:cdn-all`: 以cdn前缀打包——>更新到正式&预发布
- `deploy:cdn-pre`: 以cdn前缀打包——>更新到预发布
- `deploy:cdn-online`: 以cdn前缀打包——>更新到正式

## 压缩图片
- vscode 插件：image-compressor

## 一键部署到cdn
-  先到 `efe-config.js` 配置本次静态资源所在的本地web-cdn git 仓库中的目录，填写绝对路径
-  运行命令：`npm run cdn`，即可把dist目录中除了 html 文件的所有文件都上传到cdn中

## 一键部署到ftp
### 方案一：vscode 插件

### 方案二：命令行
工作流模式，一键部署`npm run deploy`：build-->ftp

## parceljs
### 功能
- 开箱即用，不用安装依赖
- 支持打包typescript、es6
- **主要用来解决静态资源版本号问题**

### 打包命令参数说明
- `--public-url` 指定打包出来的资源引用路径