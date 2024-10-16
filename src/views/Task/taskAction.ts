import { TaskType } from '@/enums/TaskType';
import axios from '@/plugins/axios'
import { ref } from 'vue'

interface Task {
  id: number;
  name: string;
  detail: string;
  deadline: Date; 
  check: number;
}

export const tasklist = () => {

  const tasks = ref<Task[]>([])
  const snackOpen = ref(false);
  const snackText = ref('');
  const snackColor = ref('blue-lighten-1');

  const init = async () => {
    try {
      const response = await axios.get('/tasks')
      tasks.value = response.data.filter((task: Task) => task.check !== TaskType.Checked );
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const updated = () => {}

  const deleted = () => {}

  const completeTask = async (taskId: number) => {
    try {
      const response = await axios.post(`/task/checked/${taskId}`)
      if (response.data) {
        snackText.value = `「${response.data['task_name']}」を完了しました。`
        snackOpen.value = true; 
        snackColor.value = 'cyan-darken-1'
        init()
      } else {
        snackText.value = '既にチェックされています。';
        snackOpen.value = true;
        snackColor.value = 'red-darken-1'
      }
    } catch (error) {
      console.error('Error failed checked:', error)
    }
  }

  return {
    init,
    tasks,
    updated,
    deleted,
    completeTask,
    snackOpen,
    snackText,
    snackColor,
  }
}
