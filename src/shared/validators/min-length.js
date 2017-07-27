import {ValidatorForm} from 'react-material-ui-form-validator';

export default () => {
  ValidatorForm.addValidationRule('minLength', value => value.length >= 6);
}