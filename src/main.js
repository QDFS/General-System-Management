import Vue from 'vue'
import App from './App.vue'

//引入router
import router from './router'

//引入store
import store from './store'

import mock from './api/mock'


//引入ElementUI库
import {
  Row,
  Button,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Dialog,
  MessageBox,
  Form,
  FormItem,
  Select,
  Option,
  Input,
  DatePicker,
  Message,
  Pagination
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false

//使用elementui库
Vue.use(Row)
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Pagination)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  created() {
    store.commit('tab/addRoute', router)
  },
  render: h => h(App),
}).$mount('#app')
