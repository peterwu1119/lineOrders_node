(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,n){},172:function(e,t,n){e.exports=n(414)},198:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},199:function(e,t,n){},217:function(e,t){},219:function(e,t){},251:function(e,t){},252:function(e,t){},321:function(e,t){},414:function(e,t,n){"use strict";n.r(t);n(173);var a=n(0),o=n.n(a),c=n(98),i=n.n(c),r=n(416),u=n(417),s=(n(101),n(39)),l=n(40),m=n(42),p=n(41),f=n(43),d=n(415),b=n(69),h=n.n(b),g=(n(198),n(199),o.a.Component,n(21)),v=(n(203),function(e){function t(e,n){var a;Object(s.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e,n))).createMenu=a.createMenu.bind(Object(g.a)(Object(g.a)(a))),a.saveImage=a.saveImage.bind(Object(g.a)(Object(g.a)(a))),a.pushMessage=a.pushMessage.bind(Object(g.a)(Object(g.a)(a))),a.getUserId=a.getUserId.bind(Object(g.a)(Object(g.a)(a)));new window.VConsole;return a}return Object(f.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){}},{key:"getUserId",value:function(){return new Promise(function(e,t){window.liff.init(function(t){var n=t.context.userId;e(n)},function(e){t("error occur")})})}},{key:"createMenu",value:function(){console.log("in create menu");var e=this,t="";e.getUserId().then(function(n){return t=n,e.saveImage()}).then(function(n){var a=n.data;return e.pushMessage(a,t)}).then(function(){window.liff.closeWindow()})}},{key:"saveImage",value:function(){var e=new FormData;return e.append("image",document.getElementById("groupBuyImage").files[0]),h.a.post("/api/putImageToFtp",e,{headers:{"Content-Type":"multipart/form-data"}})}},{key:"pushMessage",value:function(e,t){return h.a.post("/api/pushMessage",{user_id:t,message:{type:"flex",altText:"\u5718\u8cfc\u529f\u80fd",contents:{type:"bubble",hero:{type:"image",url:e,size:"full",aspectRatio:"20:13",aspectMode:"cover",action:{type:"uri",uri:"http://linecorp.com/"}},footer:{type:"box",layout:"vertical",spacing:"sm",contents:[{type:"button",style:"link",height:"sm",action:{type:"uri",label:"\u5efa\u7acb\u5718\u8cfc",uri:"http://www.google.com"}},{type:"button",style:"link",height:"sm",action:{type:"uri",label:"\u5718\u8cfc\u5217\u8868",uri:"http://www.google.com"}},{type:"spacer",size:"sm"}],flex:0}}}})}},{key:"render",value:function(){return o.a.createElement("div",{class:"container mt-3"},o.a.createElement("h2",null,"\u5efa\u7acb\u5718\u8cfc"),o.a.createElement("p",null),o.a.createElement("form",{action:"javascript:void(0);"},o.a.createElement("div",{class:"custom-file mb-3"},o.a.createElement("input",{type:"file",class:"custom-file-input",id:"customFile",name:"image"}),o.a.createElement("label",{class:"custom-file-label",for:"customFile"},"\u8acb\u4e0a\u50b3\u5716\u7247")),o.a.createElement("div",{class:"mt-3"},o.a.createElement("button",{class:"btn btn-primary",onClick:this.createMenu},"\u5efa\u7acb\u5718\u8cfc"))))}}]),t}(o.a.Component)),y=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){this.props.match.params.userId;return o.a.createElement("div",null,o.a.createElement("h1",null,"\u8a02\u8cfc"))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(r.a,null,o.a.createElement("div",null,o.a.createElement(u.a,{path:"/createGroupBuy/",component:v}),o.a.createElement(u.a,{path:"/joinGroupBuy",component:y}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[172,2,1]]]);
//# sourceMappingURL=main.c0dfa93e.chunk.js.map