import Vue from 'vue'
import {
    Pagination,
    /* 
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem, */
    Autocomplete,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,/* 
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch, */
    Select,/* 
    Option,
    OptionGroup, */
    Button,/* 
    ButtonGroup, */
    Table,
    TableColumn,
    Popover,
    /* 
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover, */
    Tooltip,/* 
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem, */
    Tabs,
    TabPane,
    Tag,/* 
    Tree,
    Alert, */
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,/* 
    Spinner,
    Badge,
    Card,
    Rate,
    Steps,
    Step, */
    Card,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,/* 
    Cascader,
    ColorPicker,
    Transfer, */
    Container,
    Header,
    Aside,
    Main,
    Footer,
    /* Timeline,
    TimelineItem,
    Link,
    Divider, */
    Image,
    /* Calendar,
    Backtop,
    PageHeader,
    CascaderPanel,
    Loading,
    MessageBox, */
    Message,
    Notification
  } from 'element-ui';
   
  Vue.use(Pagination)
  Vue.use(Autocomplete)
  Vue.use(Menu);
  Vue.use(Submenu);
  Vue.use(MenuItem);
  Vue.use(MenuItemGroup);
  Vue.use(Select);
  Vue.use(Button);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Tooltip);
  Vue.use(Tabs);
  Vue.use(TabPane);
  Vue.use(Tag);
  Vue.use(Slider);
  Vue.use(Icon);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Upload);
  Vue.use(Progress);
  Vue.use(Card);
  Vue.use(Carousel);
  Vue.use(CarouselItem);
  Vue.use(Collapse);
  Vue.use(CollapseItem);
  Vue.use(Container);
  Vue.use(Header);
  Vue.use(Aside);
  Vue.use(Main);
  Vue.use(Footer);
  Vue.use(Image);
  Vue.use(Popover)

  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;