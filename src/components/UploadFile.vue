<template>
    <div class="file-area">
        <div class="file-block" v-for="(img, i) in previewImage" :key="'previewImage-'+i">
            <img :src="img" style="width: 100%; height: 100%;">
            <div class="btn-block">
                <div class="btn-block-item" @click="remove(img)"><span><i class="bi bi-trash"></i></span></div>
            </div>
        </div>
        <div class="btn-upload" ref="picUploadButton">
            <span>UPLOAD</span>
        </div>
    </div>
    <div class="file-area">
        <div class="file-block" v-for="(img, i) in ImageList" :key="'ImageList-'+i">
            <img :src="img.url" :alt="img.fileName" style="width: 100%; height: 100%;">
            <div class="btn-block">
                <div class="btn-block-item" style="border-right: solid 2px"><span><i class="bi bi-zoom-in"></i></span></div>
                <div class="btn-block-item" @click="download(img.url)"><span><i class="bi bi-download"></i></span></div>
                <div class="btn-block-item" style="border-left: solid 2px" @click="deleteFile(img)"><span><i class="bi bi-trash"></i></span></div>
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
        download(url) {
            document.location.href=url;
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
        },
        async deleteFile(dataObject) {
            if (await this.showDelComfirm()) {  //難怪在這個then裡面放await會不行，因為他本身也是一個promise。
                let uuid=dataObject.url.split("/")[4];
                const result=await uploadFileService.deleteFile(uuid)
                        .then((response)=>{
                            return response.data;
                        },(error)=>{
                            return error.response.data;
                        });
                if (result?.status===200) {
                    this.ImageList=this.ImageList.filter((obj)=>{
                        return obj!==dataObject;
                    });
                }
            }
        },
        remove(dataObject) {
            this.previewImage=this.previewImage.filter((obj)=>{
                return obj!==dataObject;
            });
        },
        showDelComfirm() {
            return this.$SwalConfirm.fire({
                width: 320,
                title: "是否刪除檔案？",
                confirmButtonText: "刪除",
                cancelButtonText: "取消",
            }).then(result=>result.isConfirmed);
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
    cursor: pointer;    /*變為手指*/
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
.btn-upload {
    display: flex;
    width: 150px;
    height: 150px;
    margin: 0px 10px 10px 0px;
    background-color: #F5F7FA;
    justify-content: center;
    align-items: center;
    color: #848EA1;
    font-size: 16px;
    cursor: pointer;
}
</style>