export enum TaskType {
    Unchecked = 0,
    Checked = 1,
}

export const getTaskTypeLabel = (type: TaskType): string => {
    switch (type) {
        case TaskType.Unchecked:
            return '未チェック';
        case TaskType.Checked:
            return 'チェック済';
        default:
            return "";
    }
}