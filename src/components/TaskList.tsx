import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    // checar se o campo do input não está vazio
    // se possuir um valor, executa o escopo
    if(newTaskTitle){
      //nova task do tipo Task com o id random, title é o valor do input e isComplete inicia como false
      const newTask: Task = {
        id: Math.random(),
        title: newTaskTitle,
        isComplete:false
      }
      //utilizando o set do estado para adicionar a nova task
      //com o callback "oldState" garante que os valores antigos estejam atualizados, pois a renderização é assíncrona
      //o spread operator ...oldState pega os valores antigos e salva junto com a nova task
      setTasks(oldState => [...oldState, newTask]);

      //setar o input controlado para o estado inicial, limpa o input
      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // para marcar a task como completa é necessário mapear a lista de tasks e encontrar a task com o id igual ao selecionado
    // na task procurada é preciso alterar o atributo isComplete, é possível fazer isso negando seu estado atual,
    // então se o isComplete for false, muda pra true. e vice-versa
    //para as demais tasks nada muda
    const newTasks = tasks.map(task => task.id == id ? { ...task, isComplete : !task.isComplete} : task);

    //após isso seta novamente a lista de tasks
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    //criar um novo estado ao invés de modificar um existente
    //então, segue-se o conceito de criar uma nova lista de tasks com todos que tenham o id diferente do selecionado
    //para isso usa-se um filtro
    const newTasks = tasks.filter(task => task.id != id);

    //após isso seta novamente a lista de tasks
    setTasks(newTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}