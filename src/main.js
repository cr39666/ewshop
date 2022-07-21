import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import {
    Swipe,
    SwipeItem,
    lazyload,
    Badge,
    Sidebar,
    SidebarItem,
    Collapse,
    CollapseItem,
    Tab,
    Tabs,
    Card,
    Image as VanImage,
    Tag, Button,
    Form, Field,
    SubmitBar, CheckboxGroup, SwipeCell, Stepper, Checkbox,
    PullRefresh, List, Popup, Grid, GridItem, AddressEdit, AddressList,
    Icon,  Step

} from 'vant';

createApp(App).use(PullRefresh).use(List).use(Popup).use(Grid)
    .use(GridItem).use(AddressEdit).use(AddressList).use(Icon)
    .use(SubmitBar).use(CheckboxGroup).use(SwipeCell).use(Stepper)
    .use(Checkbox).use(Step)
    .use(Swipe).use(SwipeItem).use(Badge).use(Form).use(Field)
    .use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem)
    .use(Tab).use(Tabs).use(Card).use(VanImage).use(Tag).use(Button)
    .use(lazyload,{loading:require('./assets/images/default.png')})
    .use(store).use(router).mount('#app')
