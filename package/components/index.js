import Box from './box/index.vue'
import Breadcrumb from './breadcrumb/index.vue'
import Button from './button/index.vue'
import ButtonDelete from './button-delete/index.vue'
import Container from './container/index.vue'
import Dialog from './dialog/index.vue'
import DragSort from './drag-sort/index.vue'
import FlexColumn from './flex-column/index.vue'
import FlexRow from './flex-row/index.vue'
import FlexLeft from './flex-left/index.vue'
import FlexRight from './flex-right/index.vue'
import FlexTop from './flex-top/index.vue'
import FlexBottom from './flex-bottom/index.vue'
import Form from './form/index.vue'
import FormBox from './form-box/index.vue'
import FormDialog from './form-dialog/index.vue'
import Head from './head/index.vue'
import Icon from './icon/index.vue'
import IconPicker from './icon-picker/index.vue'
import List from './list/index.vue'
import LoginH from './login-h/index.vue'
import LoginK from './login-k/index.vue'
import LoginM from './login-m/index.vue'
import Menu from './menu/index.vue'
import Scrollbar from './scrollbar/index.vue'
import ToolbarFullscreen from './toolbar-fullscreen/index.vue'
import ToolbarLang from './toolbar-lang/index.vue'
import ToolbarSkin from './toolbar-skin/index.vue'
import VerifycodeInput from './verifycode-input/index.vue'

const components = [
  Box,
  Breadcrumb,
  Button,
  ButtonDelete,
  Container,
  Dialog,
  DragSort,
  FlexColumn,
  FlexRow,
  FlexLeft,
  FlexRight,
  FlexTop,
  FlexBottom,
  Form,
  FormBox,
  FormDialog,
  Head,
  Icon,
  IconPicker,
  List,
  LoginH,
  LoginK,
  LoginM,
  Menu,
  Scrollbar,
  ToolbarFullscreen,
  ToolbarLang,
  ToolbarSkin,
  VerifycodeInput,
]

export default app => {
  components.forEach(m => {
    app.component(`Mu${m.name}`, m)
  })
}
