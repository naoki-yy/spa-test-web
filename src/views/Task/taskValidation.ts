import { ref } from "vue";

export const taskAction = () => {

  const form = ref();
  const required = (value: string) => !!value || '必須項目です。';
  const dateValidator = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) || '正しい日付を入力してください (YYYY-MM-DD)';
  
  const taskFormValidation = async () => {
    const isValid = await form.value?.validate(); 
    return isValid.valid
  }

  return {
    form,
    required,
    dateValidator,
    taskFormValidation
  }
}
