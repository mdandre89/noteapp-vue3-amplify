<template>
  <div class="profile">
    <h1>This is an profile page</h1>
    <div class="notes-screen">
      <button @click="createNew">Create New</button>
    </div>
    <div class="display-notes" v-for="(todo, index) in todoList" :key="index">
      {{ todo.notesId }}
      <input placeholder="title" type="text" v-model="todo.title" />
      <input placeholder="text" type="text" v-model="todo.text" />
      <button @click="addTodo(todo)" class="save">save</button>
      <button @click="deleteTodo(todo)" class="delete">X</button>
    </div>
  </div>
</template>

<script>
import { API, Auth } from "aws-amplify";
import { ref } from "vue";

export default {
  setup() {
    const id = ref("");
    const todoList = ref([]);
    Auth.currentAuthenticatedUser()
      .then((data) => {
        id.value = data.username;
        API.get("amplifyVue3Notes", `/notes/${data.username}`, {}).then(
          (result) => {
            todoList.value = result;
          }
        );
      })
      .catch((e) => {
        console.log(e);
      });

    return {
      id,
      todoList,
    };
  },
  methods: {
    addTodo: function (item) {
      console.log(item);
      console.log(`addTodo`);
      API.post("amplifyVue3Notes", `/notes`, {
        body: {
          userId: item.userId,
          notesId: item.notesId.toString(),
          title: item.title,
          text: item.text,
        },
      }).catch((err) => {
        console.log(err);
      });
    },
    deleteTodo: function (item) {
      console.log(`deleteTodo-${item.id}`);
      API.del(
        "amplifyVue3Notes",
        `/notes/object/${item.userId}/${item.notesId}`,
        {}
      )
        .then((result) => {
          this.todoList = this.todoList.filter(
            (note) => note.notesId !== item.notesId
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createNew() {
      const newIndex = Math.max(...this.todoList.map((item) => item.notesId));
      const newItem = {
        notesId: newIndex + 1,
        title: "",
        text: "",
        userId: this.id,
      };
      this.todoList.push(newItem);
    },
  },
};
</script>
<style scoped>
button {
  margin: 10px;
  background-color: #ffac31;
  color: white;
  letter-spacing: 0.75px;
  padding: 16px;
  border: none;
  cursor: pointer;
  min-width: 120px;
  border-radius: 5px;
  text-transform: uppercase;
}
.save {
  background-color: #537be5;
}
.delete {
  background-color: #dd3f5b;
}
.notes-screen {
  display: flex;
  margin: 0 auto;
  justify-content: center;
}
.display-notes {
  margin: 20px auto;
}
input {
  padding: 15px;
  margin: 0px 0px 20px 0;
  box-sizing: border-box;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 3px;
  margin: 0 10px;
}
.input:focus {
  outline: none;
  border-color: rgb(255, 153, 0);
}
</style>