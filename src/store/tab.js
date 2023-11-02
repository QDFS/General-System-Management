import Cookies from "js-cookie"

export default {
    namespaced: true,
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ],

        menuData: []
    },
    mutations: {
        changeMenu(state) {
            state.isCollapse = !state.isCollapse
        },

        checkMenu(state, val) {
            if (val.path !== '/') {
                const index = state.tabsList.findIndex(item => item.name === val.name)
                if (index == -1) {
                    state.tabsList.push(val)
                }
            }
            // console.log(state.tabsList, 'state')
        },

        closeMenu(state, val) {
            const index = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(index, 1)
            // console.log(val
        },

        setMenu(state, val) {
            // console.log(val)
            state.menuData = val
            Cookies.set("menuData", JSON.stringify(val))
        },

        // 设置动态路由
        addRoute(state, router) {
            if (!Cookies.get('menuData')) return
            const menu = JSON.parse(Cookies.get('menuData'))

            const menuArray = []

            menu.forEach(item => {
                if (item.children) {
                    item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })

            console.log(menuArray)

            menuArray.forEach(item => {
                router.addRoute("Main", item)
            })


        }
    }
}