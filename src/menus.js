const menus = [
  {
    name: '首页',
    type: 1,
    icon: 'home',
    level: 1,
    show: true,
    routeName: 'home',
    locales: {
      en: 'Home',
    },
  },
  {
    name: '国际化',
    type: 1,
    icon: 'home',
    level: 1,
    show: true,
    routeName: 'i18n',
    locales: {
      en: 'i18n',
    },
  },
  {
    name: '布局组件',
    type: 0,
    icon: 'layout',
    level: 1,
    show: true,
    locales: {
      en: 'Layout Component',
    },
    children: [
      {
        name: '容器',
        type: 1,
        icon: 'container',
        level: 2,
        show: true,
        routeName: 'doc_layout_container',
        locales: {
          en: 'Container',
        },
      },
      {
        name: '盒子',
        type: 1,
        icon: 'box',
        level: 2,
        show: true,
        routeName: 'doc_layout_box',
        locales: {
          en: 'Box',
        },
      },
      {
        name: '小盒子',
        type: 1,
        icon: 'box',
        level: 2,
        show: true,
        routeName: 'doc_layout_boxsmall',
        locales: {
          en: 'BoxSmall',
        },
      },
      {
        name: '弹性布局',
        type: 1,
        icon: 'flex',
        level: 2,
        show: true,
        routeName: 'doc_layout_flex',
        locales: {
          en: 'Flex',
        },
      },
      {
        name: '滚动条',
        type: 1,
        icon: 'fold-b',
        level: 2,
        show: true,
        routeName: 'doc_layout_scrollbar',
        locales: {
          en: 'Scrollbar',
        },
      },
      {
        name: '头部',
        type: 1,
        icon: 'arrow-up',
        level: 2,
        show: true,
        routeName: 'doc_layout_head',
        locales: {
          en: 'Head',
        },
      },
      {
        name: '面板分割',
        type: 1,
        icon: 'split',
        level: 2,
        show: true,
        routeName: 'doc_layout_split',
        locales: {
          en: 'Panel Split',
        },
      },
    ],
  },
  {
    name: '基础组件',
    type: 0,
    icon: 'module',
    level: 1,
    show: true,
    locales: {
      en: 'Base Component',
    },
    children: [
      {
        name: '图标',
        type: 1,
        icon: 'icon',
        level: 2,
        show: true,
        routeName: 'doc_base_icon',
        locales: {
          en: 'Icon',
        },
      },
      {
        name: '按钮',
        type: 1,
        icon: 'button',
        level: 2,
        show: true,
        routeName: 'doc_base_button',
        locales: {
          en: 'Button',
        },
      },
    ],
  },
  {
    name: '高级组件',
    type: 0,
    icon: 'star',
    level: 1,
    show: true,
    locales: {
      en: 'Advanced Component',
    },
    children: [
      {
        name: '对话框',
        type: 1,
        icon: 'chat-o',
        level: 2,
        show: true,
        routeName: 'doc_advanced_dialog',
        locales: {
          en: 'Dialog',
        },
      },
      {
        name: '抽屉',
        type: 1,
        icon: 'list',
        level: 2,
        show: true,
        routeName: 'doc_advanced_drawer',
        locales: {
          en: 'Drawer',
        },
      },
      {
        name: '列表页',
        type: 1,
        icon: 'list',
        level: 2,
        show: true,
        routeName: 'doc_advanced_list',
        locales: {
          en: 'List',
        },
      },
      {
        name: '拖拽排序',
        type: 1,
        icon: 'list',
        level: 2,
        show: true,
        routeName: 'doc_advanced_drag_sort',
        locales: {
          en: 'DragSort',
        },
      },
      {
        name: '列表盒子',
        type: 1,
        icon: 'list',
        level: 2,
        show: true,
        routeName: 'doc_advanced_listbox',
        locales: {
          en: 'ListBox',
        },
      },
    ],
  },
  {
    name: '表单组件',
    type: 0,
    icon: 'form',
    level: 1,
    show: true,
    locales: {
      en: 'Form Component',
    },
    children: [
      {
        name: '表单',
        type: 1,
        icon: 'edit',
        level: 2,
        show: true,
        routeName: 'doc_advanced_form',
        locales: {
          en: 'Form',
        },
      },
      {
        name: '对话框表单',
        type: 1,
        icon: 'edit',
        level: 2,
        show: true,
        routeName: 'doc_advanced_formdialog',
        locales: {
          en: 'FormDialog',
        },
      },
      {
        name: '抽屉表单',
        type: 1,
        icon: 'edit',
        level: 2,
        show: true,
        routeName: 'doc_advanced_formdrawer',
        locales: {
          en: 'FormDrawer',
        },
      },
      {
        name: '盒子表单',
        type: 1,
        icon: 'edit',
        level: 2,
        show: true,
        routeName: 'doc_advanced_formbox',
        locales: {
          en: 'FormBox',
        },
      },
      {
        name: '下拉框',
        type: 1,
        icon: 'icon',
        level: 2,
        show: true,
        routeName: 'doc_form_select',
        locales: {
          en: 'Select',
        },
      },
      {
        name: '可搜索下拉框',
        type: 1,
        icon: 'icon',
        level: 2,
        show: true,
        routeName: 'doc_form_select_search',
        locales: {
          en: 'SelectSearch',
        },
      },
      {
        name: '列表选择',
        type: 1,
        icon: 'icon',
        level: 2,
        show: true,
        routeName: 'doc_form_list_select',
        locales: {
          en: 'ListSelect',
        },
      },
    ],
  },
]

const setMenusId = (children, parent) => {
  children.forEach((sub, index) => {
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
