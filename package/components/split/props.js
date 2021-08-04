import { withProps as loading } from '../../composables/loading'

export default {
  ...loading,
  modelValue: {
    type: [Number, String],
    default: '300px',
  },
  mode: {
    validator(value) {
      return value === 'horizontal' || value === 'vertical'
    },
    default: 'horizontal',
  },
  min: {
    type: [Number, String],
    default: '40px',
  },
  max: {
    type: [Number, String],
    default: 1,
  },
}
