import { TaskType } from '@/enums/TaskType'
import axios from '@/plugins/axios'
import { ref } from 'vue'
import { taskAction } from './taskValidation'

const { form, required, dateValidator, taskFormValidation } = taskAction()

interface Task {
  id: number
  name: string
  detail: string
  deadline: Date
  check: number
}

export const tasklist = () => {
  const tasks = ref<Task[]>([])
  const snackOpen = ref(false)
  const snackText = ref('')
  const snackColor = ref('blue-lighten-1')
  const dialog = ref(false)
  const taskName = ref('')
  const taskDetail = ref('')
  const deadLine = ref('')

  const init = async () => {
    try {
      const response = await axios.get('/tasks')
      tasks.value = response.data.filter((task: Task) => task.check !== TaskType.Checked)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const addTask = async () => {
    openDialog()
  }

  const openDialog = () => {
    dialog.value = true
  }

  const closeDialog = () => {
    dialog.value = false
  }

  const createTask = async () => {
    const result = await taskFormValidation()

    if (result) {
      try {
        const submitTask = {
          name: taskName.value,
          detail: taskDetail.value,
          deadLine: deadLine.value,
        }
        await axios.post('/add/task', submitTask);
        init();
      } catch (error) {
        console.error(error);
      }

      resetForm()
      dialog.value = false
    } 
  }

  const resetForm = () => {
    taskName.value = ''
    taskDetail.value = ''
    deadLine.value = ''
    form.value?.resetValidation()
  }

  const updated = () => {}

  const deleted = () => {}

  const completeTask = async (taskId: number) => {
    try {
      const response = await axios.post(`/task/checked/${taskId}`)
      if (response.data) {
        snackText.value = `「${response.data['task_name']}」を完了しました。`
        snackOpen.value = true
        snackColor.value = 'cyan-darken-1'
        init()
      } else {
        snackText.value = '既にチェックされています。'
        snackOpen.value = true
        snackColor.value = 'red-darken-1'
      }
    } catch (error) {
      console.error('Error failed checked:', error)
    }
  }

  return {
    init,
    tasks,
    addTask,
    updated,
    deleted,
    completeTask,
    snackOpen,
    snackText,
    snackColor,
    dialog,
    openDialog,
    closeDialog,
    taskName,
    taskDetail,
    deadLine,
    createTask,
    form,
    required,
    dateValidator
  }
}
