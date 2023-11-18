<script setup>
    import { ref } from 'vue';

    const items = ref([]);
    let titleValue = ref(null);
    let aboutValue = ref(null)

    const addTodo = function(){
        const item = {
            'title': titleValue.value,
            'about': aboutValue.value
        };

        items.value.push(item);

        titleValue.value = null;
        aboutValue.value = null;
    }

    const deleteTodo = function(item){
        const getIndex = items.value.indexOf(item);
        
        items.value.splice(getIndex, 1);
    }
</script>

<template>
    <main class="container">
        <div class="constant">
            <div class="card w-75 m-auto">
                <div class="card-header">
                    <h2 class="card-title">
                        Todo App
                    </h2>
                </div>
                <div class="card-body row">
                    <div class="inputs col-md-6">
                        <div class="mb-3">
                            <input type="text" v-model="titleValue" placeholder="Title" class="form-control">
                        </div>
                        <div class="mb-3">
                            <textarea placeholder="About" v-model="aboutValue" rows="6" class="form-control"></textarea>
                        </div>
                        <div class="">
                            <button @click="addTodo" class="btn btn-warning w-100">Add Todo</button>
                        </div>
                    </div>
                    <div class="tasks col-md-6">
                        <div class="" v-if="items.length > 0">
                            <ul class="list-group">
                                <li class="list-group-item" v-for="item, index of items" :key="item.title + '-' + index">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex col-md-10 align-items-center">
                                            <div class="card-text me-3">
                                                {{ item.title }}    
                                            </div>
                                            <div class="card-text me-3">
                                                {{ item.about }}    
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <button class="btn btn-danger" @click="deleteTodo(item)">Delete</button>
                                        </div>    
                                    </div>
                                </li>
                            </ul>  
                        </div>
                        <div class="" v-else>
                            Bruhhh Is Empty!!!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
    .about{
        height: 350px;
    }

    .card-body{
        display: flex;
    }
</style>