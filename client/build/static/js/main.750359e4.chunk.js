(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,n){},172:function(e,t,n){e.exports=n(412)},196:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},197:function(e,t,n){},215:function(e,t){},217:function(e,t){},249:function(e,t){},250:function(e,t){},319:function(e,t){},412:function(e,t,n){"use strict";n.r(t);var a=n(3),o=n.n(a),i=n(98),r=n.n(i),c=n(414),u=n(415),s=(n(101),n(39)),l=n(40),p=n(42),m=n(41),d=n(43),h=n(413),f=n(69),g=n.n(f),b=(n(196),n(197),o.a.Component,n(28)),y=(n(201),function(e){function t(e,n){var a;return Object(s.a)(this,t),(a=Object(p.a)(this,Object(m.a)(t).call(this,e,n))).createMenu=a.createMenu.bind(Object(b.a)(Object(b.a)(a))),a.saveImage=a.saveImage.bind(Object(b.a)(Object(b.a)(a))),a.pushMessage=a.pushMessage.bind(Object(b.a)(Object(b.a)(a))),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=document.createElement("script");e.src="https://d.line-scdn.net/liff/1.0/sdk.js",e.async=!0,document.body.appendChild(e)}},{key:"createMenu",value:function(){var e=this;g.a.get("/api/getImgurClientId").then(function(t){var n=t.data;return e.saveImage(n)}).then(function(t){e.pushMessage(t)}).then(function(){e.liff.closeWindow()})}},{key:"saveImage",value:function(e){return new Promise(function(t,n){var a=new FormData;a.append("image",document.getElementById("groupBuyImage").files[0]);var o=new XMLHttpRequest;o.open("POST","https://api.imgur.com/3/image"),o.setRequestHeader("Authorization","Client-ID "+e),o.onload=function(){if(200==o.status){var e=JSON.parse(o.responseText);t(e.data.link)}else n("Error :"+o.responseText)},o.send(a)})}},{key:"pushMessage",value:function(e){var t=this.props.match.params.user_id;return g.a.post("/api/pushMessage",{user_id:t,message:{type:"flex",altText:"\u5718\u8cfc\u529f\u80fd\u9078\u55ae",contents:{type:"bubble",hero:{type:"image",url:e,size:"full",aspectRatio:"20:13",aspectMode:"cover",action:{type:"uri",uri:"http://linecorp.com/"}},footer:{type:"box",layout:"vertical",spacing:"sm",contents:[{type:"button",style:"link",height:"sm",action:{type:"uri",label:"\u5efa\u7acb\u5718\u8cfc",uri:"http://www.google.com"}},{type:"button",style:"link",height:"sm",action:{type:"uri",label:"\u5718\u8cfc\u5217\u8868",uri:"http://www.google.com"}},{type:"spacer",size:"sm"}],flex:0}}}})}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"\u5efa\u7acb\u5718\u8cfc"),"\u8acb\u4e0a\u50b3\u5718\u8cfc\u5716\u7247\uff1a ",o.a.createElement("input",{id:"groupBuyImage",type:"file"}),o.a.createElement("hr",null),o.a.createElement("input",{type:"button",value:"\u5efa\u7acb",onClick:this.createMenu}))}}]),t}(o.a.Component)),v=function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){this.props.match.params.userId;return o.a.createElement("div",null,o.a.createElement("h1",null,"\u8a02\u8cfc"))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(c.a,null,o.a.createElement("div",null,o.a.createElement(u.a,{path:"/createGroupBuy/:user_id",component:y}),o.a.createElement(u.a,{path:"/joinGroupBuy",component:v}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[172,2,1]]]);
//# sourceMappingURL=main.750359e4.chunk.js.map