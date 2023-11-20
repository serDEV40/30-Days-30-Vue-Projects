<script setup>
    import { ref, onMounted, onUpdated } from 'vue';
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faYoutube } from "@fortawesome/free-brands-svg-icons"
    import { faPlay, faForwardStep, faBackwardStep, faVolumeHigh, faRepeat, faPause } from "@fortawesome/free-solid-svg-icons";
    import { computed } from 'vue';

    library.add(faPlay, faPause, faForwardStep, faBackwardStep, faVolumeHigh, faRepeat, faYoutube);

    const audio = new Audio();
    const songSrc = "../music/";
    const musics = ref([{
        'artist': "Lady Gaga",
        'songName': "Bloody Mary",
        'imageSource': "lady_gaga",
        'audioSource': songSrc + "Lady Gaga - Bloody Mary.mp3",
    }, {
        'artist': "Fergie",
        'songName': "Glamorous",
        'imageSource': "fergie",
        'audioSource': songSrc + "Fergie - Glamorous ft. Ludacris.mp3",
    }]);

    let index = ref(0);
    let songName = ref(null);
    let inputMax = ref(null);
    let inputMin = ref(null);
    let switchIcon = ref(true);
    let artistName = ref(null);
    let imageSource = ref(null);
    let card_duration = ref(null);
    let musicDuration = ref(null);
    let musicCurrentTime = ref(null);
    let setColor = ref({'color': "#837c80"});

    function audioSettings(source){
        audio.src = source;
        
        audio.onloadedmetadata = ()=>{
            songLength(audio.duration);
            inputMax.value = audio.duration;
        };

        audio.ontimeupdate = ()=>{
            currTime(audio.currentTime);
            inputMin.value = audio.currentTime
        }
    }

    function setSrc(momentValue){
        songName.value = momentValue.songName;
        artistName.value = momentValue.artist;
        imageSource.value =  momentValue.imageSource;
        audioSettings(momentValue.audioSource);
    }

    onMounted(()=>{
        let momentValue = musics.value[index.value];
        setSrc(momentValue);
    });

    const songLength = (event)=>{
        let duration = computed(()=>{
            let dakika = Math.round(event / 60);
            let saniye = Math.floor(event % 60);
            
            if(dakika < 9){
                dakika = "0" + dakika;
            }else{
                dakika;
            }
            //
            if(saniye < 9){
                saniye = "0" + saniye;
            }else{
                saniye;
            }

            return dakika + ":" + saniye;
        });

        musicCurrentTime.value = "00:00";
        musicDuration.value = duration.value;
    }

    let currTime = (event)=>{
        let current_time = computed(()=>{
            let dakika = Math.floor(event / 60);
            let saniye = Math.floor(event % 60);
            
            if(dakika < 9){
                dakika = "0" + dakika;
            }
            //
            if(saniye < 9){
                saniye = "0" + saniye;
            }

            return dakika + ":" + saniye;
        });

        musicCurrentTime.value = current_time.value;
    }


    function pause_play(){
        if(audio.paused){
            audio.play();
            switchIcon.value = !switchIcon.value;
        }else if(audio.played){
            audio.pause();
            switchIcon.value = !switchIcon.value;
        }
    }

    const setInput = function(event){
        audio.currentTime = event.target.value;
    }

    let nextBtn = function(){
        if(index.value < musics.value.length - 1){
            index.value++;
        }else{
            index.value = 0
        }

        setSrc(musics.value[index.value]);
    }

    const loopMusic = ()=>{
        if(audio.loop == false){
            audio.loop = true;
            setColor.value = {'color': "white"};
        }else{
            audio.loop = false;
            setColor.value = {'color': "gray"};
        }
        return audio.loop;
    };
</script>

<template>
    <main class="container">
        <div class="content">
            <div class="content-top">
                <Transition name="slide-fade" appear>
                    <img 
                        :src="'../images/' + imageSource + '.jpeg'" 
                        width="192" 
                        :alt="artistName"
                        style="border-radius: 6px;" />
                </Transition>
                <div class="controller">
                    <div class="album-info">
                        <div class="w-33">
                            {{ songName }}
                        </div>
                        <div class="w-33">
                            ∆
                        </div>
                        <div class="w-33">
                            {{ artistName }}
                        </div>
                    </div>
                    <div>
                        <span class="song-name">

                        </span>
                    </div>
                    <div class="input-bar">
                        <div>
                            <input type="range" :max="inputMax" @input="setInput" :value="inputMin">
                        </div>
                        <div style="width: 100%;display: flex; justify-content: space-between; margin-bottom: 1rem;">
                            <div>
                                {{ musicCurrentTime }}
                            </div>
                            <div>
                                {{ musicDuration }}
                            </div>
                        </div>
                    </div>
                    <div class="buttons">
                        <div class="save-btn">
                            <button class="btn">
                                <font-awesome size="2x" icon="fa-brands fa-youtube" style="color: rgb(255, 0, 0)"/>
                            </button>
                        </div>
                        <div class="list-button">
                            <div>
                                <button class="btn prev">
                                    <font-awesome icon="fa-solid fa-backward-step" size="2x" style="color: #837c80;"/>
                                </button>
                            </div>
                            <div>
                                <button class="btn play-stop" @click="pause_play" style="background-color: #FFF;">
                                    <font-awesome icon="fa-solid fa-play" 
                                        style="color: black;" 
                                        size="2x" 
                                        v-if="audio.paused"/>

                                    <font-awesome icon="fa-solid fa-pause" 
                                    style="color: black;" 
                                    size="2x" v-else/>
                                </button>
                            </div>
                            <div>
                                <button class="btn next" @click="nextBtn">
                                    <font-awesome icon="fa-solid fa-forward-step" size="2x" style="color: #837c80;"/>
                                </button>
                            </div>
                            <div>
                                <button class="btn looper" @click="loopMusic">
                                    <font-awesome v-if="!audio.loop" style="color: #837c80;" icon="fa-solid fa-repeat" size="2x"/>
                                    <svg v-else aria-hidden="true" viewBox="0 0 16 16" fill="#FFF">
                                        <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5zM12.25 2.5h-.75V1h.75A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25z"></path>
                                        <path d="M9.12 8V1H7.787c-.128.72-.76 1.293-1.787 1.313V3.36h1.57V8h1.55z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="sound-btn">
                            <button class="btn">
                                <font-awesome size="2x" icon="fa-solid fa-volume-high" style="color: #FFF;"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-body">
                <div class="title" style="padding: 1rem 0rem;">
                    <h3>
                        Playlist
                    </h3>
                </div>
                <div class="songs">
                    <div class="component" v-for="music, index of musics" :key="'song-' + index">
                        <div class="little-image">
                            <img 
                                :src="'../images/' + music.imageSource +'.jpeg'" 
                                :alt="music.artist"
                                width="64" 
                                style="border-radius: 6px;">
                        </div>
                        <div class="song-infos">
                            <div style="display: flex; align-items: center; flex-direction: column; text-align: left; flex: 1 0 0;">
                                <div style="width: 100%;">
                                    {{ music.songName }}
                                </div>
                                <div style="width: 100%;">
                                    <small>{{ music.artist }}</small>
                                </div>
                            </div>
                            <div class="music-duration">
                                {{  }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }

    .slide-fade-to, .slide-fade-leave-from{
        opacity: 1;
        transform: translateX(-20px);
    }

    .list-button{
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .btn{
        font-size: 1rem;
        border-radius: 50%;
        border: none;
        width: 50px;
        height: 50px;
        background-color: transparent;
    }

    .content{
        max-width: 650px;
        margin: 0px auto;
        position: relative;
        padding: 2rem;
        background-color: rgb(47, 33, 46);
        border-radius: 1rem;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        color: #FFF;
        transform: translate(-50%,-50%);
    }
    .buttons{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1 0 0;
    }

    .component{
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .song-infos{
        width: 100%;
        height: 64px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .content-top{
        display: flex;
        flex: 1 0 0;
        gap: 30px;
        justify-content: space-between;
    }

    .album-info{
        display: flex;
        justify-content: space-between;
        flex: 1 0 0;
        margin: 0 0 1rem 0;
    }

    .controller{
        width: 100%;
    }

    input[type=range]{
        width: 100%;
        margin-bottom: 1rem;
    }
</style>