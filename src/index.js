import g from './global'

import foo from './views/foo'
import bar from './views/bar'

const routes = {
	'/foo':foo,
	'./bar':bar
}

class Router{
	start(){
		  // 点击浏览器后退/前进按钮时会触发window.onpopstate事件, 我们在这时切换到相应页面
     // https://developer.mozilla.org/en-US/docs/Web/Events/popstate
		window.addEventListener('popstate',()=>{
			this.load(location.pathname);
		})
		// 打开页面时加载当前页面
		this.load(location.pathname);
	}
// 前往path, 会变更地址栏URL, 并加载相应页面
	go(path){
	 // 变更地址栏URL
		history.pushState({},'',path);
		this.load(path);
	}
	 // 加载path路径的页面
	load(path){
		// 创建页面实例
		const view = new routes[path]();
		view.mount(document.body)
	}

}

// new一个路由对象, 赋值为g.router, 这样我们在其他js文件中可以引用到
g.router = new Router();
// 启动
g.router.start();