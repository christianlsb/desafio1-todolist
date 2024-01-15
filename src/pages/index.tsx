import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { ToastAction } from "@/components/ui/toast";
interface Task {
  id: number;
  title: string;
  date?: Date;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [value, setValue] = useState("");
  const [editValue, setEditValue] = useState("");

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success("Tarefa excluida com sucesso", {});
  };

  const handleEditTask = (id: number) => {
    if (!editValue) return toast.error("De um nome para sua tarefa");
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          title: editValue,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditValue("");
    toast.success("Tarefa editada com sucesso", {});
  };

  const handleAddTask = () => {
    // if (!value)
    //   return toast.error("De um nome para sua tarefa", {
    //     duration: 3000,
    //   });
    // setTasks((prevTasks) => [
    //   ...prevTasks,
    //   {
    //     id: Math.max(...prevTasks.map((task) => task.id), 0) + 1,
    //     title: value,
    //   },
    // ]);
    // setValue("");
    // toast.success("Tarefa criada com sucesso", {
    //   action: {
    //     label: "Desfazer",
    //     onClick: () => setTasks((prevTasks) => prevTasks.slice(0, -1)),
    //   },
    // });

    if (!value) return toast.error("De um nome para sua tarefa");
    setTasks([
      ...tasks,
      {
        id: Math.max(...tasks.map((task) => task.id), 0) + 1,
        title: value,
      },
    ]);
    console.log(tasks);
    setValue("");
    toast.success("Tarefa criada com sucesso", {
      action: {
        label: "Desfazer",
        onClick: () => setTasks((prevTasks) => prevTasks.slice(0, -1)),
      },
    });
  };
  console.log(tasks);
  return (
    <main>
      <section className="my-4">
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Cadastrar tarefa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Cadastre sua tarefa</DialogTitle>
              </DialogHeader>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder="Digite sua tarefa"
              />
              <DialogFooter className="sm:justify-start gap-2">
                <DialogClose asChild>
                  <Button onClick={handleAddTask}>Salvar</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Fechar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Card className="my-4 p-5">
          {tasks.length > 0 && <h1>Suas tarefas</h1>}
          {tasks.length === 0 && (
            <p className="text-center">Nenhuma tarefa cadastrada</p>
          )}
          <ul className="flex flex-col gap-6 p-5">
            {tasks.map((task) => (
              <li key={task.id}>
                <Card>
                  <div className="flex justify-between p-4 max-sm:flex-col ">
                    <div className="max-sm:pb-3">
                      <p className="text-sm overflow-hidden max-h-20 max-sm:text-center">
                        {task.title}
                      </p>
                    </div>
                    <div className="flex gap-3 max-sm:justify-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Editar</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Edite sua tarefa</DialogTitle>
                          </DialogHeader>
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            type="text"
                            placeholder="Digite sua tarefa"
                          />
                          <DialogFooter className="sm:justify-stat gap-2">
                            <DialogClose asChild>
                              <Button onClick={() => handleEditTask(task.id)}>
                                Salvar
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Fechar
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Excluir</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>
                              Deseja excluir essa tarefa?
                            </DialogTitle>
                          </DialogHeader>
                          {task.title}
                          <DialogFooter className="sm:justify-start">
                            <Button onClick={() => handleDeleteTask(task.id)}>
                              Confirmar
                            </Button>
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Fechar
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </main>
  );
}
