"use strict";var fs=require("fs"),path=require("path"),batch=[{directory:"E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-fly",newName:"role-fly-"},{directory:"E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-gl",newName:"role-gl-"},{directory:"E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-hl",newName:"role-hl-"},{directory:"E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-jlk",newName:"role-jlk-"},{directory:"E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-lly",newName:"role-lly-"},{directory:"E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-yg",newName:"role-yg-"},{directory:"E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-yrly",newName:"role-yrly-"},{directory:"E:/web/切图/马赛克官网/序列帧输出/【職業介紹】8個角色-攻擊/sprites-role-zxz",newName:"role-zxz-"}];batch.forEach(function(e){var n=e.directory,c=e.newName;fs.readdir(n,function(e,r){if(e)throw e;r.forEach(function(e,r){var o=path.join(n,e),t=path.parse(o),l=t.dir,a=(t.name,t.ext),i=path.format({dir:l,name:c+"".concat(r),ext:a});fs.rename(o,i,function(e){if(e)throw e;console.log("".concat(o," renamed to ").concat(i))})})})});