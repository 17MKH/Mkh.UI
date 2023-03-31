import type { Menu } from '@/types'
const menus = [
  // {
  //   type: 1,
  //   icon: 'home',
  //   level: 1,
  //   show: true,
  //   routeName: 'doc_home',
  //   locales: {
  //     en: 'Home',
  //     'zh-cn': '首页',
  //   },
  // },
  {
    type: 1,
    icon: 'language',
    level: 1,
    show: true,
    routeName: 'i18n',
    locales: {
      en: 'i18n',
      'zh-cn': '国际化',
      th: 'สากล', //'国际化',
    },
  },
  {
    type: 0,
    icon: 'layout',
    level: 1,
    show: true,
    locales: {
      en: 'Layout Component',
      'zh-cn': '布局组件',
      th: 'ส่วนประกอบการจัดวาง', //'布局组件',
    },
    children: [
      {
        type: 1,
        icon: 'container',
        level: 2,
        show: true,
        routeName: 'doc_layout_container',
        locales: {
          en: 'Container',
          'zh-cn': '容器',
          th: 'กล่องบรรจุ', //'容器',
        },
      },
      {
        type: 1,
        icon: 'box',
        level: 2,
        show: true,
        routeName: 'doc_layout_box',
        locales: {
          en: 'Box',
          'zh-cn': '盒子',
          th: 'กล่อง', //'盒子',
        },
      },
      {
        type: 1,
        icon: 'box',
        level: 2,
        show: true,
        routeName: 'doc_layout_boxsmall',
        locales: {
          en: 'Small Box',
          'zh-cn': '小盒子',
          th: 'กล่องทิ้งขยะ', //'小盒子',
        },
      },
      {
        type: 1,
        icon: 'flex',
        level: 2,
        show: true,
        routeName: 'doc_layout_flex',
        locales: {
          en: 'Flex layout',
          'zh-cn': '弹性布局',
          th: 'การจัดวางแบบยืดหยุ่น', //'弹性布局',
        },
      },
      {
        type: 1,
        icon: 'fold-b',
        level: 2,
        show: true,
        routeName: 'doc_layout_scrollbar',
        locales: {
          en: 'Scrollbar',
          'zh-cn': '滚动条',
          th: 'แถบเลื่อน', //'滚动条',
        },
      },
      {
        type: 1,
        icon: 'arrow-up',
        level: 2,
        show: true,
        routeName: 'doc_layout_head',
        locales: {
          en: 'Head',
          'zh-cn': '头部',
          th: 'หัว', //'头部',
        },
      },
      {
        type: 1,
        icon: 'split',
        level: 2,
        show: true,
        routeName: 'doc_layout_split',
        locales: {
          en: 'Panel Split',
          'zh-cn': '面板分割',
          th: 'ส่วนของพาเนล', //'面板分割',
        },
      },
    ],
  },
  {
    type: 0,
    icon: 'module',
    level: 1,
    show: true,
    locales: {
      en: 'Base Component',
      'zh-cn': '基础组件',
      th: 'ส่วนประกอบพื้นฐาน', //'基础组件',
    },
    children: [
      {
        type: 1,
        icon: 'icon',
        level: 2,
        show: true,
        routeName: 'doc_base_icon',
        locales: {
          en: 'Icon',
          'zh-cn': '图标',
          th: 'ภาพไอคอน', //'图标',
        },
      },
      {
        type: 1,
        icon: 'button',
        level: 2,
        show: true,
        routeName: 'doc_base_button',
        locales: {
          en: 'Button',
          'zh-cn': '按钮',
          th: 'ปุ่ม', //'按钮',
        },
      },
    ],
  },
  {
    type: 0,
    icon: 'star',
    level: 1,
    show: true,
    locales: {
      en: 'Advanced Component',
      'zh-cn': '高级组件',
      th: 'ส่วนประกอบขั้นสูง', //'高级组件',
    },
    children: [
      {
        type: 1,
        icon: 'chat',
        level: 2,
        show: true,
        routeName: 'doc_advanced_dialog',
        locales: {
          en: 'Dialog',
          'zh-cn': '对话框',
          th: 'กล่องโต้ตอบ', //'对话框',
        },
      },
      {
        type: 1,
        icon: 'drawer',
        level: 2,
        show: true,
        routeName: 'doc_advanced_drawer',
        locales: {
          en: 'Drawer',
          'zh-cn': '抽屉',
          th: 'ลิ้นชัก', //'抽屉',
        },
      },
      {
        type: 1,
        icon: 'list',
        level: 2,
        show: true,
        routeName: 'doc_advanced_list',
        locales: {
          en: 'List',
          'zh-cn': '列表页',
          th: 'หน้ารายการ', //'列表页',
        },
      },
      {
        type: 1,
        icon: 'list',
        level: 2,
        show: true,
        routeName: 'doc_advanced_listbox',
        locales: {
          en: 'ListBox',
          'zh-cn': '列表盒子',
          th: 'กล่องรายการ', //'列表盒子',
        },
      },
      {
        type: 1,
        icon: 'sort',
        level: 2,
        show: true,
        routeName: 'doc_advanced_drag_sort',
        locales: {
          en: 'DragSort',
          'zh-cn': '拖拽排序',
          th: 'ลาก และเรียงลำดับ', //'拖拽排序',
        },
      },
    ],
  },
  {
    type: 0,
    icon: 'form',
    level: 1,
    show: true,
    locales: {
      en: 'Form Component',
      'zh-cn': '表单组件',
      th: 'ส่วนประกอบแบบฟอร์ม', //'表单组件',
    },
    children: [
      {
        type: 1,
        icon: 'edit',
        level: 2,
        show: true,
        routeName: 'doc_form',
        locales: {
          en: 'Base Form',
          'zh-cn': '基本表单',
          th: 'ฟอร์มพื้นฐาน', //'基本表单',
        },
      },
      {
        type: 1,
        icon: 'edit',
        level: 2,
        show: true,
        routeName: 'doc_formdialog',
        locales: {
          en: 'Dialog Form',
          'zh-cn': '对话框表单',
          th: 'รูปแบบกล่องโต้ตอบ', //'对话框表单',
        },
      },
      {
        type: 1,
        icon: 'edit',
        level: 2,
        show: true,
        routeName: 'doc_formdrawer',
        locales: {
          en: 'Drawer Form',
          'zh-cn': '抽屉表单',
          th: 'ฟอร์มของลิ้นชัก', //'抽屉表单',
        },
      },
      {
        type: 1,
        icon: 'edit',
        level: 2,
        show: true,
        routeName: 'doc_formbox',
        locales: {
          en: 'Box Form',
          'zh-cn': '盒子表单',
          th: 'แบบฟอร์มกล่อง', //'盒子表单',
        },
      },
      {
        type: 1,
        icon: 'icon',
        level: 2,
        show: true,
        routeName: 'doc_form_select',
        locales: {
          en: 'Select',
          'zh-cn': '下拉框',
          th: 'กล่องหย่อน', //'下拉框',
        },
      },
      {
        type: 1,
        icon: 'icon',
        level: 2,
        show: true,
        routeName: 'doc_form_select_search',
        locales: {
          en: 'Select Search',
          'zh-cn': '可搜索下拉框',
          th: 'ค้นหากล่องดึงข้อมูล', //'可搜索下拉框',
        },
      },
      {
        type: 1,
        icon: 'icon',
        level: 2,
        show: true,
        routeName: 'doc_form_list_select',
        locales: {
          en: 'List Select',
          'zh-cn': '列表选择',
          th: 'การเลือกรายการ', //'国际化',
        },
      },
    ],
  },
  {
    type: 0,
    icon: 'user',
    level: 1,
    show: true,
    locales: {
      en: 'Power',
      'zh-cn': '权限管理',
      th: 'การจัดการสิทธิ์', //'权限管理',
    },
    children: [
      {
        type: 1,
        icon: 'user',
        level: 2,
        show: true,
        routeName: 'doc_account',
        locales: {
          en: 'Account Manage',
          'zh-cn': '账户管理',
          th: 'การจัดการบัญชี', //'账户管理',
        },
        buttons: ['doc_account_add', 'doc_account_edit', 'doc_account_delete'],
      },
    ],
  },
]

const setMenusId = (children: Menu[], parent?: Menu) => {
  children.forEach((sub, index) => {
    sub.module = 'doc'
    if (parent) {
      sub.id = parent.id + '-' + index
    } else {
      sub.id = index + ''
    }
    if (sub.children && sub.children.length > 0) {
      setMenusId(sub.children, sub)
    }
  })
}

setMenusId(menus as unknown as Menu[], undefined)

export default menus as unknown as Menu[]
