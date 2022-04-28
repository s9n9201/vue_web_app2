import axiosInstance from "@/services/axios-instance";

class UploadFileService {
    upload(Module, UUID, file, onUploadProgress) {
        let formData=new FormData();
        for (var i=0; i<file.length; i++) {
            formData.append("files", file[i]);
        }
        formData.append("module", Module);
        formData.append("fromuuid", UUID);
        return axiosInstance.post("/upload", formData, {
            headers: {
                "Content-type": "multipart/form-data"
            },
            onUploadProgress
        });
    }

    getFiles(Module, UUID) {
        return axiosInstance.get("/files/"+Module+"/"+UUID);
    }

    deleteFile(UUID) {
        return axiosInstance.delete("/deletefile/"+UUID);
    }
}

export default new UploadFileService();
