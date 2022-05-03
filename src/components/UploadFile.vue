<template>
<!--    <div><input type="file" multiple></div>-->
    <div class="images">
<!--        <div class="img">eit</div>-->
        <div class="img" v-for="(img, i) in previewImage" :key="'previewImage-'+i"><img :src="img" style="width: 100%; height: 100%;"></div>
        <div class="pic" id="picUploadButton" ref="picUploadButton">
            add
        </div>
    </div>
    <div class="file-area">
        <div class="file-block" v-for="(img, i) in ImageList" :key="'ImageList-'+i">
            <img :src="img.url" :alt="img.fileName" style="width: 100%; height: 100%;">
            <div class="btn-block">
                <div class="btn-block-item" style="border-right: solid 2px" onclick="alert('TEST');"><span><i class="bi bi-zoom-in"></i></span></div>
                <div class="btn-block-item"><span><i class="bi bi-download"></i></span></div>
                <div class="btn-block-item" style="border-left: solid 2px"><span><i class="bi bi-trash"></i></span></div>
            </div>
        </div>
    </div>
</template>

<script>
import uploadFileService from "@/services/uploadFile.service";

export default {
    name: "UploadFile",
    data() {
        return {
            previewImage: [],
            uploadFileList: [],
            ImageList: [],
        }
    },
    methods: {
        upload(module, fromuuid) {
            if (this.uploadFileList.length>0) {
                return uploadFileService.upload(module, fromuuid, this.uploadFileList)
                        .then((response)=>{
                            console.log("檔案的response", response);
                            return response.data;
                        })
                        .catch((error)=>{
                            console.log("檔案上傳失敗 > ", error.response);
                            return error.response.data;
                        });
            }
            return "";
        },
        getFile(module, fromuuid) {
            return uploadFileService.getFiles(module, fromuuid)
                    .then((response)=>{
                        return response;
                    });
        },
        setUpload() {
            let button=this.$refs.picUploadButton;
            let fileElement=document.createElement("input");
            fileElement.setAttribute("type","file");
            fileElement.setAttribute("accept","image/*");
            fileElement.setAttribute("multiple",true);
            button.addEventListener("click", ()=>{
                fileElement.click();
            });
            fileElement.addEventListener("change",(event)=>{
                this.selectImage(event);
            });
        },
        selectImage(event) {
            let uploadFileList=event.target.files;
            for (let i=0; i<uploadFileList.length; i++) {
                this.previewImage.push(URL.createObjectURL(uploadFileList[i]));
                this.uploadFileList.push(uploadFileList[i]);
            }
        }
    },
    created() {
    },
    mounted() {
        this.setUpload();
    },
    beforeUnmount() {
        document.removeEventListener("click", undefined);
        document.removeEventListener("change", undefined);
    }
}
</script>

<style scoped>
.file-area {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
}
.file-block {
    width: 150px;
    height: 150px;
    margin: 0px 10px 10px 0px;
    border-radius: 5px;
    display: flex;
    cursor: pointer;    /*變為手指*/
    position: relative;
    overflow: hidden;   /*內容超出後會修整，這樣圖片才會有border-redius屬性*/
}
.btn-block {
    display: flex;
    height: 30px;
    bottom: 0;
    padding-top: 2px;   /*讓圖案看起來更置中*/
    align-items: center;
    transition: opacity .1s ease-in;
    opacity: 0;
    background-color: #000;
    position: absolute;
}
.file-block:hover .btn-block {
    opacity: 0.6;
}
.btn-block-item {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}
.btn-block-item:hover .bi-zoom-in, .btn-block-item:hover .bi-download, .btn-block-item:hover .bi-trash {
    color: white;
}
.images {
    display: flex;
    flex-wrap:  wrap;
    margin-top: 20px;
}
.images .img, .images .pic {
    flex-basis: 23%;
    margin-bottom: 10px;
    border-radius: 4px;
}
.images .img {
    /*width: 112px;*/
    height: 93px;
    background-size: cover;
    margin-right: 10px;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.images .img span {
    display: none;
    text-transform: capitalize;
    z-index: 5;
}
.images .img::after {
    content: '';
    width: 100%;
    height: 100%;
    transition: opacity .1s ease-in;
    border-radius: 4px;
    opacity: 0;
    position: absolute;
}
.images .img:hover::after {
    display: block;
    background-color: #000;
    opacity: .5;
}
.images .img:hover span {
    display: block;
    color: #fff;
}
.images .pic {
    background-color: #F5F7FA;
    align-self: center;
    text-align: center;
    padding: 40px 0;
    text-transform: uppercase;
    color: #848EA1;
    font-size: 14px;
    cursor: pointer;
}
</style>