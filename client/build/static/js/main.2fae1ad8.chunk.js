(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,n){},172:function(e,t,n){e.exports=n(412)},196:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},197:function(e,t,n){},215:function(e,t){},217:function(e,t){},249:function(e,t){},250:function(e,t){},319:function(e,t){},412:function(e,t,n){"use strict";n.r(t);var a=n(3),o=n.n(a),i=n(98),r=n.n(i),u=n(414),c=n(415),s=(n(101),n(39)),l=n(40),p=n(42),m=n(41),f=n(43),d=n(413),h=n(69),g=n.n(h),y=(n(196),n(197),o.a.Component,n(28)),b=(n(201),function(e){function t(e,n){var a;Object(s.a)(this,t),(a=Object(p.a)(this,Object(m.a)(t).call(this,e,n))).createMenu=a.createMenu.bind(Object(y.a)(Object(y.a)(a))),a.saveImage=a.saveImage.bind(Object(y.a)(Object(y.a)(a))),a.pushMessage=a.pushMessage.bind(Object(y.a)(Object(y.a)(a)));new window.VConsole;return a}return Object(f.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){}},{key:"getUserId",value:function(){return new Promise(function(e,t){window.liff.init(function(t){var n=t.context.userId;e(n)},function(e){t("error occur")})})}},{key:"createMenu",value:function(){var e=this,t="";e.getUserId().then(function(n){return t=n,e.saveImage()}).then(function(n){var a=n.data;return e.pushMessage(a,t)}).then(function(){window.liff.closeWindow()})}},{key:"saveImage",value:function(){var e=new FormData;return e.append("image",document.getElementById("groupBuyImage").files[0]),g.a.post("/api/putImageToFtp",e,{headers:{"Content-Type":"multipart/form-data"}})}},{key:"pushMessage",value:function(e,t){return g.a.post("/api/pushMessage",{user_id:t,message:{type:"flex",altText:"\u5718\u8cfc\u529f\u80fd",contents:{type:"bubble",hero:{type:"image",url:e,size:"full",aspectRatio:"20:13",aspectMode:"cover",action:{type:"uri",uri:"http://linecorp.com/"}},footer:{type:"box",layout:"vertical",spacing:"sm",contents:[{type:"button",style:"link",height:"sm",action:{type:"uri",label:"\u5efa\u7acb\u5718\u8cfc",uri:"http://www.google.com"}},{type:"button",style:"link",height:"sm",action:{type:"uri",label:"\u5718\u8cfc\u5217\u8868",uri:"http://www.google.com"}},{type:"spacer",size:"sm"}],flex:0}}}})}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"\u5efa\u7acb\u5718\u8cfc"),"\u8acb\u4e0a\u50b3\u5718\u8cfc\u5716\u7247\uff1a ",o.a.createElement("input",{id:"groupBuyImage",type:"file"}),o.a.createElement("hr",null),o.a.createElement("input",{type:"button",value:"\u5efa\u7acb",onClick:this.createMenu}))}}]),t}(o.a.Component)),v=function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){this.props.match.params.userId;return o.a.createElement("div",null,o.a.createElement("h1",null,"\u8a02\u8cfc"))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(u.a,null,o.a.createElement("div",null,o.a.createElement(c.a,{path:"/createGroupBuy/:user_id",component:b}),o.a.createElement(c.a,{path:"/joinGroupBuy",component:v}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[172,2,1]]]);
//# sourceMappingURL=main.2fae1ad8.chunk.js.map