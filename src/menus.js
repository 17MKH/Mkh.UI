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
    },
    children: [
      {
        name: '',
        type: 1,
        icon: 'edit',
        level: 2,
        show: true,
        routeName: 'doc_form',
        locales: {
          en: 'Base Form',
          'zh-cn': '基本表单',
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
        },
      },
    ],
  },
]

const setMenusId = (children, parent) => {
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

setMenusId(menus)

export default menus
