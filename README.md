Interactive task specifications.

Index: [bssth.github.io/test-task/](https://bssth.github.io/test-task/index.html)

| Position                  | Junior | Middle | Senior | Team Lead |
|---------------------------|--------|--------|--------|-----------|
| Golang Developer          | [→](https://bssth.github.io/test-task/golang/junior.html) | [→](https://bssth.github.io/test-task/golang/middle.html) | [→](https://bssth.github.io/test-task/golang/senior.html) | [→](https://bssth.github.io/test-task/golang/lead.html) |
| React Frontend Developer  | [→](https://bssth.github.io/test-task/react/junior.html)  | [→](https://bssth.github.io/test-task/react/middle.html)  | [→](https://bssth.github.io/test-task/react/senior.html)  | [→](https://bssth.github.io/test-task/react/lead.html)  |
| Python Developer          | [→](https://bssth.github.io/test-task/python/junior.html) | [→](https://bssth.github.io/test-task/python/middle.html) | [→](https://bssth.github.io/test-task/python/senior.html) | [→](https://bssth.github.io/test-task/python/lead.html) |

## Структура

```
assets/
  styles.css   общие стили
  render.js    рендер страницы из window.TASK_DATA
{role}/
  {grade}.html тонкая обёртка с описанием задачи
index.html     главная с навигацией
```

Чтобы добавить новую задачу — создай HTML с `TASK_DATA` по образцу любой существующей страницы.
