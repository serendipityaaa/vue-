import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,//控制菜单展开还是收起
        tabsList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ],
        menu: [],//面包屑数据
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //修改更新面包屑数据
        selectMenu(state, val) {
            //判断添加的数据是否是首页
            if (val.name !== 'Home') {
                const index = state.tabsList.findIndex(item => item.name === val.name)
                //如果不存在
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        closeTag(state, item) {
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index, 1)
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        //动态注册路由
        addMenu(state, router) {
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.component = item.children.map(item => {
                        item.component = () => import(`../views/${item.path}`)
                        return item
                    })
                }
            })

        }
    }
}